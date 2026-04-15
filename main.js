setTimeout(() => { const p = document.getElementById('pre'); if (p) { p.remove(); document.documentElement.style.overflow = ''; document.getElementById('pg').style.opacity = '1'; } }, 6000);
//const lenis = new Lenis({ duration: 1.3, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
const lenis = new Lenis({ autoRaf: true, autoToggle: true, anchors: true, allowNestedScroll: true, naiveDimensions: true, stopInertiaOnNavigate: true, duration: 1.3, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
lenis.on('scroll', () => { if (window.ScrollTrigger) ScrollTrigger.update(); });
//const cur = document.getElementById('cur'), crng = document.getElementById('crng');
let mx = 0, my = 0, rx = 0, ry = 0;
//document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; gsap.to(cur, { x: mx, y: my, duration: .1, ease: 'power3.out' }); });
//(function loop() { rx += (mx - rx) * .1; ry += (my - ry) * .1; gsap.set(crng, { x: rx, y: ry }); requestAnimationFrame(loop); })();
//document.querySelectorAll('a,button').forEach(el => { el.addEventListener('mouseenter', () => { cur.classList.add('h'); crng.classList.add('h'); }); el.addEventListener('mouseleave', () => { cur.classList.remove('h'); crng.classList.remove('h'); }); });
document.documentElement.style.overflow = 'hidden';
const cnt = { v: 0 };
gsap.to(cnt, { v: 100, duration: 2.2, ease: 'power2.inOut', onUpdate() { const v = Math.round(cnt.v); document.getElementById('pp').textContent = v + '%'; document.getElementById('pf').style.height = v + '%'; }, onComplete() { setTimeout(() => { gsap.to('#pre', { yPercent: -100, duration: 1.2, ease: 'power4.inOut', onComplete() { const p = document.getElementById('pre'); if (p) p.remove(); document.documentElement.style.overflow = ''; gsap.to('#pg', { opacity: 1, duration: 0.5, onComplete: init }); } }); }, 300); } });
function init() {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('nav .nl a[href^="#"]').forEach(a => { a.addEventListener('click', e => { const id = a.getAttribute('href'); if (id.length > 1) { e.preventDefault(); const t = document.querySelector(id); if (t) lenis.scrollTo(t, { offset: -88 }); } }); });
    gsap.from('#hey', { opacity: 0, y: 16, duration: .9, ease: 'power3.out', delay: .1 });
    gsap.from('#hh1', { opacity: 0, y: 24, duration: 1.0, ease: 'power3.out', delay: .25 });
    gsap.from('#hsub', { opacity: 0, y: 20, duration: .9, ease: 'power3.out', delay: .45 });
    gsap.from('#hact', { opacity: 0, y: 16, duration: .8, ease: 'power3.out', delay: .65 });
    gsap.from('#hdoor', { opacity: 0, y: 20, duration: 1.2, ease: 'power3.out', delay: .4 });
    gsap.from('#hstats', { opacity: 0, x: 16, duration: .9, ease: 'power3.out', delay: .7 });
    document.querySelectorAll('.anim').forEach((el, i) => { gsap.from(el, { opacity: 0, y: 32, duration: .9, ease: 'power3.out', delay: (i % 4) * 0.08, scrollTrigger: { trigger: el, start: 'top 84%', once: true } }); });
    ScrollTrigger.create({ start: 'top -50px', onEnter: () => document.getElementById('nav').style.boxShadow = '0 2px 28px rgba(10,20,50,0.07)', onLeaveBack: () => document.getElementById('nav').style.boxShadow = 'none' });
    window.addEventListener('scroll', () => { const n = document.querySelector('.hnum'); if (n) n.style.transform = 'translateY(' + (scrollY * .13) + 'px)'; }, { passive: true });
    document.querySelectorAll('.bp,.bsub,.ncta').forEach(btn => { btn.addEventListener('mousemove', e => { const r = btn.getBoundingClientRect(); gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * .13, y: (e.clientY - r.top - r.height / 2) * .17, duration: .4, ease: 'power2.out' }); }); btn.addEventListener('mouseleave', () => { gsap.to(btn, { x: 0, y: 0, duration: .7, ease: 'elastic.out(1,.5)' }); }); });
}