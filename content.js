// YouTube Shorts Blocker & Football Spoiler Mask - Content Script

let isHideShortsEnabled = true;
let isMaskSoccerEnabled = true;
let scanTimeout = null;

// 1. ページロード直後に初期化（チラツキ防止）
document.documentElement.setAttribute("data-hide-shorts", "true");

// ストレージから最新設定を取得
chrome.storage.sync.get({ hideShorts: true, maskSoccer: true, enabled: true }, (data) => {
  isHideShortsEnabled = data.hideShorts !== undefined ? data.hideShorts : data.enabled !== false;
  isMaskSoccerEnabled = data.maskSoccer !== undefined ? data.maskSoccer : true;

  applyHideShorts(isHideShortsEnabled);
  if (isMaskSoccerEnabled) {
    triggerScanBurst();
  }
});

// 2. ショート・ゲームルーム非表示の適用
function applyHideShorts(enabled) {
  isHideShortsEnabled = enabled;
  document.documentElement.setAttribute("data-hide-shorts", enabled ? "true" : "false");
  if (enabled) {
    checkAndRedirectShortsUrl();
  }
}

// 3. /shorts/ または /playables のアクセス時に自動リダイレクト
function checkAndRedirectShortsUrl() {
  if (!isHideShortsEnabled) return;
  const currentPath = window.location.pathname;
  if (currentPath.startsWith("/shorts/")) {
    const videoId = currentPath.split("/shorts/")[1]?.split(/[?&#]/)[0];
    if (videoId) {
      const searchParams = window.location.search ? window.location.search.replace(/^\?/, "&") : "";
      const newUrl = `/watch?v=${videoId}${searchParams}`;
      window.location.replace(newUrl);
    }
  } else if (currentPath.startsWith("/playables")) {
    window.location.replace("/");
  }
}

// ==========================================================================
// 4. サッカーネタバレ防止マスク (Football Spoiler Mask)
// ==========================================================================

const VIDEO_SELECTORS = [
  "ytd-rich-item-renderer",
  "ytd-video-renderer",
  "ytd-grid-video-renderer",
  "ytd-compact-video-renderer",
  "yt-lockup-view-model",
  "ytd-playlist-video-renderer"
];

// 多様なYouTubeのDOM構造からタイトルを確実に抽出
function getVideoTitle(card) {
  // 1. タイトル要素（通常・Wizコンポーネント含む）
  const titleEl = card.querySelector(
    "#video-title, yt-formatted-string#video-title, a#video-title-link, h3 a, h3, [class*='metadata-view-model'] h3, [class*='metadata-view-model'] [role='text']"
  );
  if (titleEl) {
    const text = titleEl.textContent?.trim() || titleEl.getAttribute("title")?.trim() || "";
    if (text) return text;
  }

  // 2. サムネイルのリンク（aria-labelに動画タイトルが記載されているケースが極めて多い）
  const thumb = card.querySelector("a#thumbnail, a.yt-lockup-view-model__thumbnail-container, a[href*='/watch']");
  if (thumb) {
    const aria = thumb.getAttribute("aria-label") || thumb.getAttribute("title") || "";
    if (aria) return aria.trim();
    const text = thumb.textContent?.trim();
    if (text) return text;
  }

  // 3. 動画再生リンク
  const watchLink = card.querySelector("a[href*='watch?v=']");
  if (watchLink) {
    const text = watchLink.textContent?.trim() || watchLink.getAttribute("title") || watchLink.getAttribute("aria-label") || "";
    if (text) return text;
  }

  return "";
}

function maskVideoCard(card, matchedClub) {
  // 既にマスク済みまたは解除済みの場合は重複適用しない
  if (
    card.classList.contains("soccer-spoiler-masked") ||
    card.classList.contains("soccer-spoiler-revealed") ||
    card.closest(".soccer-spoiler-masked") ||
    card.querySelector(".soccer-spoiler-overlay")
  ) {
    return;
  }

  // マスクを配置するコンテナ（#dismissible, #content, またはカード自身）
  const container = card.querySelector("#dismissible, #content, .yt-lockup-view-model") || card;

  card.classList.add("soccer-spoiler-masked");
  container.classList.add("soccer-spoiler-masked");

  // 位置指定
  container.style.position = "relative";
  container.style.overflow = "hidden";
  container.style.borderRadius = "12px";

  const overlay = document.createElement("div");
  overlay.className = "soccer-spoiler-overlay";
  overlay.innerHTML = `
    <div class="soccer-spoiler-icon">⚽</div>
    <div class="soccer-spoiler-title">サッカーネタバレ防止マスク</div>
    <div class="soccer-spoiler-club-badge">${escapeHtml(matchedClub)}</div>
    <div class="soccer-spoiler-hint">クリックしてマスクを剥がす</div>
  `;

  // クリックでマスクを剥がす（リンク先への誤遷移を完全に防止）
  overlay.addEventListener(
    "click",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      overlay.classList.add("soccer-spoiler-peeling");
      setTimeout(() => {
        card.classList.remove("soccer-spoiler-masked");
        container.classList.remove("soccer-spoiler-masked");
        card.classList.add("soccer-spoiler-revealed");
        container.classList.add("soccer-spoiler-revealed");
        overlay.remove();
      }, 200);
    },
    true
  );

  // ポインターイベントの親要素（YouTubeリンク）への透過を防止
  const blockEvent = (e) => {
    e.stopPropagation();
  };
  overlay.addEventListener("mousedown", blockEvent, true);
  overlay.addEventListener("mouseup", blockEvent, true);
  overlay.addEventListener("pointerdown", blockEvent, true);
  overlay.addEventListener("pointerup", blockEvent, true);

  container.appendChild(overlay);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function scanAndMaskSoccerVideos() {
  if (!isMaskSoccerEnabled) return;
  if (!window.__SOCCER_SPOILER__ || !window.__SOCCER_SPOILER__.matchSoccerClub) return;

  const selector = VIDEO_SELECTORS.join(", ");
  const cards = document.querySelectorAll(selector);

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    if (
      card.classList.contains("soccer-spoiler-masked") ||
      card.classList.contains("soccer-spoiler-revealed") ||
      card.closest(".soccer-spoiler-masked")
    ) {
      continue;
    }

    const title = getVideoTitle(card);
    if (!title) continue;

    const matchedClub = window.__SOCCER_SPOILER__.matchSoccerClub(title);
    if (matchedClub) {
      maskVideoCard(card, matchedClub);
    }
  }
}

function removeAllSoccerMasks() {
  document.querySelectorAll(".soccer-spoiler-overlay").forEach((el) => el.remove());
  document.querySelectorAll(".soccer-spoiler-masked").forEach((el) => {
    el.classList.remove("soccer-spoiler-masked");
    el.classList.remove("soccer-spoiler-revealed");
  });
}

function scheduleSoccerScan() {
  if (!isMaskSoccerEnabled) return;
  if (scanTimeout) clearTimeout(scanTimeout);
  scanTimeout = setTimeout(scanAndMaskSoccerVideos, 60);
}

// ページ遷移直後などのロード段階に合わせて段階的に走査
function triggerScanBurst() {
  scanAndMaskSoccerVideos();
  setTimeout(scanAndMaskSoccerVideos, 300);
  setTimeout(scanAndMaskSoccerVideos, 800);
  setTimeout(scanAndMaskSoccerVideos, 1500);
  setTimeout(scanAndMaskSoccerVideos, 3000);
}

// 5. 動的ローディング（スクロール）の監視
const observer = new MutationObserver(() => {
  if (!isMaskSoccerEnabled) return;
  scheduleSoccerScan();
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});

// スクロール時の走査
window.addEventListener("scroll", scheduleSoccerScan, { passive: true });

// 1.5秒ごとのヘルスチェック走査（動的描画漏れ防止）
setInterval(() => {
  if (isMaskSoccerEnabled) {
    scanAndMaskSoccerVideos();
  }
}, 1500);

// 6. YouTubeのSPA画面遷移イベントを監視
window.addEventListener("yt-navigate-finish", () => {
  checkAndRedirectShortsUrl();
  triggerScanBurst();
});
window.addEventListener("yt-page-data-updated", () => {
  checkAndRedirectShortsUrl();
  triggerScanBurst();
});
window.addEventListener("popstate", () => {
  checkAndRedirectShortsUrl();
  triggerScanBurst();
});

// 7. バックグラウンドからの設定変更メッセージを受信
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "SET_ENABLED") {
    applyHideShorts(message.enabled);
    sendResponse({ success: true, hideShorts: message.enabled });
  } else if (message.action === "SET_SOCCER_MASK") {
    isMaskSoccerEnabled = message.enabled;
    if (isMaskSoccerEnabled) {
      triggerScanBurst();
    } else {
      removeAllSoccerMasks();
    }
    sendResponse({ success: true, maskSoccer: message.enabled });
  } else if (message.action === "SET_ALL") {
    applyHideShorts(message.hideShorts);
    isMaskSoccerEnabled = message.maskSoccer;
    if (isMaskSoccerEnabled) {
      triggerScanBurst();
    } else {
      removeAllSoccerMasks();
    }
    sendResponse({ success: true });
  }
});

// 初期ロード時の実行
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    checkAndRedirectShortsUrl();
    triggerScanBurst();
  });
} else {
  checkAndRedirectShortsUrl();
  triggerScanBurst();
}
