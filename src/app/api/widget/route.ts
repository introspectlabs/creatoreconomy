import { NextResponse } from 'next/server';

/**
 * Public endpoint that serves the PersonaMatrix widget bootstrap script.
 * This is what gets loaded via:
 *   <script src="https://cdn.personamatrix.ai/widget.js" defer></script>
 *
 * In production this would be served from a CDN. This route acts as the
 * development/preview equivalent.
 */
export async function GET() {
  const script = `
(function(window, document) {
  'use strict';

  // ── Prevent double-init ──────────────────────────────────────────────────
  if (window.__PersonaMatrixLoaded) return;
  window.__PersonaMatrixLoaded = true;

  var PM = window.PersonaMatrix = window.PersonaMatrix || {};
  var _config = null;
  var _container = null;
  var _shadow = null;
  var _isOpen = false;
  var _listeners = {};
  var _queue = PM.queue || [];

  // ── Analytics hook ───────────────────────────────────────────────────────
  function track(eventName, props) {
    emit('analytics', { name: eventName, properties: props || {} });
    // Forward to GA4 if available
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'personamatrix_' + eventName, props || {});
    }
    // Forward to Segment if available
    if (window.analytics && typeof window.analytics.track === 'function') {
      window.analytics.track('PersonaMatrix ' + eventName, props || {});
    }
  }

  // ── Event emitter ────────────────────────────────────────────────────────
  function emit(event, data) {
    var handlers = _listeners[event] || [];
    for (var i = 0; i < handlers.length; i++) {
      try { handlers[i](data); } catch(e) {}
    }
  }

  // ── Shadow DOM container ─────────────────────────────────────────────────
  function createContainer(config) {
    _container = document.createElement('div');
    _container.id = 'personamatrix-widget-root';
    _container.setAttribute('aria-label', 'AI Assistant');
    _container.style.cssText = 'position:fixed;z-index:2147483647;pointer-events:none;';
    document.body.appendChild(_container);

    // Use Shadow DOM for style isolation if supported
    if (_container.attachShadow) {
      _shadow = _container.attachShadow({ mode: 'open' });
    } else {
      _shadow = _container;
    }

    // Inject base styles into shadow root
    var style = document.createElement('style');
    style.textContent = getBaseStyles(config);
    _shadow.appendChild(style);

    // Create widget mount point
    var mount = document.createElement('div');
    mount.id = 'pm-mount';
    mount.style.cssText = 'pointer-events:auto;';
    _shadow.appendChild(mount);

    return mount;
  }

  // ── Base styles (injected into Shadow DOM) ───────────────────────────────
  function getBaseStyles(config) {
    var pos = config.position === 'bottom-left' ? 'left:20px' : 'right:20px';
    var isDark = config.theme !== 'light';
    var bg = isDark ? 'rgba(11,13,20,0.97)' : 'rgba(255,255,255,0.97)';
    var text = isDark ? 'rgba(255,255,255,0.92)' : 'rgba(0,0,0,0.87)';

    return [
      '@keyframes pmSlideUp{from{opacity:0;transform:translateY(20px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}',
      '@keyframes pmFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}',
      '@keyframes pmRipple{0%{transform:scale(1);opacity:.6}100%{transform:scale(2.2);opacity:0}}',
      '@keyframes pmBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}',
      '@keyframes pmPulse{0%,100%{opacity:1}50%{opacity:.4}}',
      '#pm-launcher{position:fixed;bottom:20px;' + pos + ';width:64px;height:64px;cursor:pointer;border:none;background:transparent;padding:0;outline:none;animation:pmFloat 3s ease-in-out infinite;}',
      '#pm-launcher:focus{outline:2px solid #E8A020;outline-offset:3px;}',
      '#pm-orb{width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,rgba(232,160,32,.15),rgba(123,111,212,.15));border:1px solid rgba(232,160,32,.3);box-shadow:0 0 30px rgba(232,160,32,.3),inset 0 1px 0 rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;overflow:hidden;}',
      '#pm-panel{position:fixed;bottom:20px;' + pos + ';width:380px;max-width:calc(100vw - 40px);height:520px;max-height:calc(100vh - 40px);background:' + bg + ';border:1px solid rgba(255,255,255,.08);border-radius:16px;box-shadow:0 24px 80px rgba(0,0,0,.5);backdrop-filter:blur(40px);display:flex;flex-direction:column;animation:pmSlideUp .3s cubic-bezier(.34,1.56,.64,1);overflow:hidden;}',
      '#pm-header{display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.06);background:linear-gradient(135deg,rgba(232,160,32,.08),rgba(123,111,212,.06));flex-shrink:0;}',
      '#pm-messages{flex:1;overflow-y:auto;padding:16px;scroll-behavior:smooth;}',
      '#pm-input-area{flex-shrink:0;padding:12px;border-top:1px solid rgba(255,255,255,.06);}',
      '.pm-msg{margin-bottom:12px;display:flex;align-items:flex-end;gap:8px;animation:pmSlideUp .2s ease;}',
      '.pm-msg-user{flex-direction:row-reverse;}',
      '.pm-bubble{max-width:78%;padding:10px 14px;border-radius:18px;font-size:13px;line-height:1.5;color:' + text + ';}',
      '.pm-bubble-user{background:linear-gradient(135deg,#E8A020,#C98A10);color:#fff;border-radius:18px 18px 4px 18px;}',
      '.pm-bubble-assistant{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-radius:18px 18px 18px 4px;}',
      '.pm-input{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:10px 44px 10px 14px;font-size:13px;color:' + text + ';outline:none;box-sizing:border-box;}',
      '.pm-input:focus{border-color:rgba(232,160,32,.4);}',
      '.pm-send{position:absolute;right:8px;top:50%;transform:translateY(-50%);width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#E8A020,#C98A10);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;}',
      '.pm-badge{position:absolute;top:-4px;right:-4px;width:20px;height:20px;border-radius:50%;background:#E8A020;color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(232,160,32,.5);}',
      '.pm-ripple{position:absolute;inset:-4px;border-radius:50%;border:2px solid rgba(232,160,32,.4);animation:pmRipple 2s ease-out infinite;}',
      '.pm-ripple2{position:absolute;inset:-8px;border-radius:50%;border:1px solid rgba(232,160,32,.2);animation:pmRipple 2s ease-out .5s infinite;}',
      '.pm-typing{display:flex;gap:4px;padding:10px 14px;}',
      '.pm-dot{width:6px;height:6px;border-radius:50%;background:#E8A020;animation:pmBounce 1.2s ease-in-out infinite;}',
      '.pm-dot:nth-child(2){animation-delay:.2s;}',
      '.pm-dot:nth-child(3){animation-delay:.4s;}',
      '.pm-online{width:6px;height:6px;border-radius:50%;background:#34d399;animation:pmPulse 2s infinite;flex-shrink:0;}',
      'button{font-family:inherit;}',
      '*{box-sizing:border-box;}',
    ].join('');
  }

  // ── Render launcher orb ──────────────────────────────────────────────────
  function renderLauncher(mount, config) {
    var launcher = document.createElement('button');
    launcher.id = 'pm-launcher';
    launcher.setAttribute('aria-label', 'Open AI Assistant');
    launcher.setAttribute('aria-haspopup', 'dialog');
    launcher.innerHTML = [
      '<div class="pm-ripple"></div>',
      '<div class="pm-ripple2"></div>',
      '<div id="pm-orb">',
        '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">',
          '<circle cx="16" cy="16" r="12" fill="url(#orbGrad)" opacity="0.9"/>',
          '<circle cx="16" cy="16" r="8" fill="url(#orbGrad2)" opacity="0.7"/>',
          '<path d="M11 16l3 3 7-7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
          '<defs>',
            '<radialGradient id="orbGrad" cx="30%" cy="30%">',
              '<stop offset="0%" stop-color="#E8A020"/>',
              '<stop offset="100%" stop-color="#7B6FD4"/>',
            '</radialGradient>',
            '<radialGradient id="orbGrad2" cx="70%" cy="70%">',
              '<stop offset="0%" stop-color="#4ECDC4"/>',
              '<stop offset="100%" stop-color="#7B6FD4"/>',
            '</radialGradient>',
          '</defs>',
        '</svg>',
      '</div>',
    ].join('');

    launcher.addEventListener('click', function() {
      PM.open();
    });

    mount.appendChild(launcher);
    return launcher;
  }

  // ── Render chat panel ────────────────────────────────────────────────────
  function renderPanel(mount, config) {
    var panel = document.createElement('div');
    panel.id = 'pm-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'AI Assistant Chat');
    panel.setAttribute('aria-modal', 'true');
    panel.style.display = 'none';

    var personaName = config.personaName || 'AI Assistant';
    var greeting = config.greeting || 'Hi! How can I help you today?';

    panel.innerHTML = [
      // Header
      '<div id="pm-header">',
        '<div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#E8A020,#7B6FD4);display:flex;align-items:center;justify-content:center;flex-shrink:0;">',
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="white"/></svg>',
        '</div>',
        '<div style="flex:1;min-width:0;">',
          '<div style="display:flex;align-items:center;gap:6px;">',
            '<span style="font-size:13px;font-weight:600;color:rgba(255,255,255,.92);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + escapeHtml(personaName) + '</span>',
            '<div class="pm-online"></div>',
          '</div>',
          '<span style="font-size:11px;color:rgba(255,255,255,.4);">Powered by PersonaMatrix</span>',
        '</div>',
        '<button id="pm-close" style="width:28px;height:28px;border-radius:8px;background:transparent;border:1px solid rgba(255,255,255,.08);cursor:pointer;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.4);" aria-label="Close chat">',
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>',
        '</button>',
      '</div>',
      // Messages
      '<div id="pm-messages" aria-live="polite" aria-label="Chat messages">',
        '<div class="pm-msg">',
          '<div style="width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#E8A020,#7B6FD4);flex-shrink:0;display:flex;align-items:center;justify-content:center;">',
            '<svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>',
          '</div>',
          '<div class="pm-bubble pm-bubble-assistant">' + escapeHtml(greeting) + '</div>',
        '</div>',
      '</div>',
      // Input
      '<div id="pm-input-area">',
        '<div style="position:relative;">',
          '<input class="pm-input" id="pm-input" type="text" placeholder="Type a message..." aria-label="Message input" autoComplete="off"/>',
          '<button class="pm-send" id="pm-send" aria-label="Send message">',
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
          '</button>',
        '</div>',
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px;padding:0 4px;">',
          '<span style="font-size:10px;color:rgba(255,255,255,.3);">Powered by <span style="color:#E8A020;">PersonaMatrix</span></span>',
        '</div>',
      '</div>',
    ].join('');

    mount.appendChild(panel);

    // Wire up close button
    panel.querySelector('#pm-close').addEventListener('click', function() {
      PM.close();
    });

    // Wire up send
    var input = panel.querySelector('#pm-input');
    var sendBtn = panel.querySelector('#pm-send');
    var messages = panel.querySelector('#pm-messages');

    function sendMessage() {
      var text = input.value.trim();
      if (!text) return;
      appendMessage('user', text);
      input.value = '';
      track('message_sent', { text: text, personaId: config.personaId });
      emit('message', { role: 'user', content: text });
      showTyping(messages);
      // Simulate AI response
      setTimeout(function() {
        removeTyping(messages);
        var response = 'Thank you for your message! I\'m processing your request about "' + text + '". Let me provide you with the most helpful response based on my knowledge.';
        appendMessage('assistant', response);
        track('message_received', { personaId: config.personaId });
        emit('message', { role: 'assistant', content: response });
      }, 1200 + Math.random() * 800);
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });

    function appendMessage(role, text) {
      var div = document.createElement('div');
      div.className = 'pm-msg' + (role === 'user' ? ' pm-msg-user' : '');
      if (role === 'assistant') {
        div.innerHTML = '<div style="width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#E8A020,#7B6FD4);flex-shrink:0;display:flex;align-items:center;justify-content:center;"><svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg></div><div class="pm-bubble pm-bubble-assistant">' + escapeHtml(text) + '</div>';
      } else {
        div.innerHTML = '<div class="pm-bubble pm-bubble-user">' + escapeHtml(text) + '</div>';
      }
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }

    function showTyping(container) {
      var typing = document.createElement('div');
      typing.id = 'pm-typing';
      typing.className = 'pm-msg';
      typing.innerHTML = '<div style="width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#E8A020,#7B6FD4);flex-shrink:0;"></div><div class="pm-bubble pm-bubble-assistant"><div class="pm-typing"><div class="pm-dot"></div><div class="pm-dot"></div><div class="pm-dot"></div></div></div>';
      container.appendChild(typing);
      container.scrollTop = container.scrollHeight;
    }

    function removeTyping(container) {
      var t = container.querySelector('#pm-typing');
      if (t) container.removeChild(t);
    }

    return panel;
  }

  // ── HTML escape ──────────────────────────────────────────────────────────
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ── Public API ───────────────────────────────────────────────────────────
  PM.init = function(config) {
    if (_config) { console.warn('PersonaMatrix: already initialized'); return PM; }
    _config = Object.assign({
      personaId: 'default',
      theme: 'dark',
      position: 'bottom-right',
      modes: ['chat'],
      greeting: 'Hi! How can I help you today?',
      personaName: 'AI Assistant',
    }, config);

    var mount = createContainer(_config);
    var launcher = renderLauncher(mount, _config);
    var panel = renderPanel(mount, _config);

    _isOpen = false;
    track('widget_initialized', { personaId: _config.personaId });
    return PM;
  };

  PM.open = function() {
    if (!_config) return PM;
    var launcher = (_shadow || _container).querySelector('#pm-launcher');
    var panel = (_shadow || _container).querySelector('#pm-panel');
    if (launcher) launcher.style.display = 'none';
    if (panel) panel.style.display = 'flex';
    _isOpen = true;
    emit('open', {});
    track('widget_opened', { personaId: _config.personaId });
    // Focus input
    setTimeout(function() {
      var input = (_shadow || _container).querySelector('#pm-input');
      if (input) input.focus();
    }, 300);
    return PM;
  };

  PM.close = function() {
    if (!_config) return PM;
    var launcher = (_shadow || _container).querySelector('#pm-launcher');
    var panel = (_shadow || _container).querySelector('#pm-panel');
    if (launcher) launcher.style.display = '';
    if (panel) panel.style.display = 'none';
    _isOpen = false;
    emit('close', {});
    track('widget_closed', { personaId: _config.personaId });
    return PM;
  };

  PM.toggle = function() {
    return _isOpen ? PM.close() : PM.open();
  };

  PM.sendMessage = function(text) {
    if (!_config || !text) return PM;
    var input = (_shadow || _container).querySelector('#pm-input');
    if (input) { input.value = text; }
    var sendBtn = (_shadow || _container).querySelector('#pm-send');
    if (sendBtn) sendBtn.click();
    return PM;
  };

  PM.setMode = function(mode) {
    emit('modeChange', { mode: mode });
    track('mode_changed', { mode: mode, personaId: _config && _config.personaId });
    return PM;
  };

  PM.on = function(event, callback) {
    if (!_listeners[event]) _listeners[event] = [];
    _listeners[event].push(callback);
    return PM;
  };

  PM.off = function(event, callback) {
    if (!_listeners[event]) return PM;
    _listeners[event] = _listeners[event].filter(function(fn) { return fn !== callback; });
    return PM;
  };

  PM.destroy = function() {
    if (_container && _container.parentNode) {
      _container.parentNode.removeChild(_container);
    }
    _container = null;
    _shadow = null;
    _config = null;
    _isOpen = false;
    _listeners = {};
    window.__PersonaMatrixLoaded = false;
    return PM;
  };

  // ── Process queued calls ─────────────────────────────────────────────────
  for (var i = 0; i < _queue.length; i++) {
    try { _queue[i](); } catch(e) {}
  }
  PM.queue = { push: function(fn) { try { fn(); } catch(e) {} } };

})(window, document);
`;

  return new NextResponse(script, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
    },
  });
}
