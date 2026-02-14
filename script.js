// ========================================
// GenbaKintai Landing Page Scripts
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // スムーズスクロール
  initSmoothScroll();
  
  // フォーム送信
  initFormHandler();
  
  // ナビゲーション
  initNavigation();
  
  // アニメーション
  initScrollAnimations();
});

// ----------------------------------------
// スムーズスクロール
// ----------------------------------------
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ----------------------------------------
// フォームハンドラー
// ----------------------------------------
function initFormHandler() {
  const form = document.getElementById('preregister-form');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // ローディング状態
    submitBtn.disabled = true;
    submitBtn.textContent = '送信中...';
    
    // フォームデータを収集
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // 実際の送信処理（ここではコンソールに出力）
    console.log('事前登録データ:', data);
    
    // TODO: 実際のAPIエンドポイントに送信
    // 例: await fetch('/api/preregister', { method: 'POST', body: JSON.stringify(data) });
    
    // デモ用の遅延
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 成功メッセージを表示
    showSuccessMessage(form);
    
    // ボタンを元に戻す
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  });
}

function showSuccessMessage(form) {
  const successHTML = `
    <div class="success-message" style="
      text-align: center;
      padding: 3rem 2rem;
    ">
      <div style="
        font-size: 4rem;
        margin-bottom: 1rem;
      ">🎉</div>
      <h3 style="
        font-size: 1.5rem;
        font-weight: 700;
        color: #1e40af;
        margin-bottom: 0.5rem;
      ">事前登録ありがとうございます！</h3>
      <p style="
        color: #64748b;
        line-height: 1.8;
      ">
        ご登録いただいたメールアドレスに<br>
        確認メールをお送りしました。<br><br>
        サービス開始時に優先的にご案内いたします。
      </p>
    </div>
  `;
  
  form.innerHTML = successHTML;
}

// ----------------------------------------
// ナビゲーション
// ----------------------------------------
function initNavigation() {
  const nav = document.querySelector('.nav');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // スクロール方向に応じてナビゲーションを表示/非表示
    if (currentScroll > 100) {
      nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
      nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });
}

// ----------------------------------------
// スクロールアニメーション
// ----------------------------------------
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // アニメーション対象の要素
  const animateElements = document.querySelectorAll(
    '.problem-card, .feature-card, .industry-card, .pricing-card, .flow-step, .faq-item'
  );
  
  animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(el);
  });
}

// アニメーション用のスタイルを動的に追加
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// ----------------------------------------
// ユーティリティ
// ----------------------------------------

// Google Analytics イベントトラッキング（将来用）
function trackEvent(category, action, label) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }
  console.log(`Track: ${category} / ${action} / ${label}`);
}

// CTAボタンのクリックトラッキング
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('click', () => {
    trackEvent('CTA', 'click', btn.textContent.trim());
  });
});
