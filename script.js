/* ==========================================================================
   Henrique Soares — Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  setYear();
  initNavToggle();
  initProjects();
  initBootConsole();
  initContactForm();
  initScrollReveal();
});

/* -------------------------------------------------------------------- */
/* Footer year                                                          */
/* -------------------------------------------------------------------- */
function setYear(){
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* -------------------------------------------------------------------- */
/* Mobile nav                                                           */
/* -------------------------------------------------------------------- */
function initNavToggle(){
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* -------------------------------------------------------------------- */
/* Projects data + render                                               */
/* -------------------------------------------------------------------- */
const PROJECTS = [
  {
    title: 'Zyntek Conect',
    description: 'Estúdio digital que desenvolve sites, sistemas e landing pages com foco em inovação, qualidade e resultado para o cliente.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: 'zyntek.png',
    link: 'https://www.zyntekconnect.com.br/',
    linkLabel: 'Visitar site'
  },
  {
    title: 'Autenticação com Google OAuth 2.0',
    description: 'Implementação de autenticação segura utilizando Google OAuth 2.0 para aplicações web.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Google API'],
    image: 'tela.png',
    link: 'https://auntentica-o-google.vercel.app/',
    linkLabel: 'Ver projeto',
    link2: 'https://github.com/henriqueSS05/Auntentica-o-Google',
    linkLabel2: 'Ver repositório'
  },
  {
    title: 'Sistema de Cadastro de Usuários',
    description: 'Sistema completo de gerenciamento de usuários com funcionalidades de cadastro, login e recuperação de senha.',
    stack: ['Java', 'Spring Boot', 'MySQL'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeeV3G6wev8ADSP0PgWXJi-gAvRM7HJmfj5igsDypP9IXqkWQJlc3RxUxYp2OSRQN5oyllqi4wd7hzPbe4yxiRT4TWxtbZADFF7fZ8axaSVLzqzIeHKHVSd9AHBQmuk0wITPOdeoW5Hb1OFUtXDVcidBTida4iaX-Cw6agW9M3AOVcG43hcQeN-LoJrHo99x3qX7u0H970-OLS01vwQLBAcgoN2KIvvg8zE4HVEPZjrprdVwLkJ4d3pNWJwpQdljcHcsdJ2nhSGl8',
    link: 'https://github.com/henriqueSS05/flux',
    linkLabel: 'Ver repositório',
  },
  {
    title: 'Sistema de Barbearia',
    description: 'Sistema completo de agendamento para barbearias e controle de clientes.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeeV3G6wev8ADSP0PgWXJi-gAvRM7HJmfj5igsDypP9IXqkWQJlc3RxUxYp2OSRQN5oyllqi4wd7hzPbe4yxiRT4TWxtbZADFF7fZ8axaSVLzqzIeHKHVSd9AHBQmuk0wITPOdeoW5Hb1OFUtXDVcidBTida4iaX-Cw6agW9M3AOVcG43hcQeN-LoJrHo99x3qX7u0H970-OLS01vwQLBAcgoN2KIvvg8zE4HVEPZjrprdVwLkJ4d3pNWJwpQdljcHcsdJ2nhSGl8',
    link: 'https://github.com/henriqueSS05/flux',
    linkLabel: 'Ver site',
    link2: 'https://github.com/henriqueSS05/flux',
    linkLabel2: 'Ver repositório'
  },
  {
    title: 'Marsil Marcenaria',
    description: 'Site institucional para marcenaria, apresentando serviços, portfólio e informações de contato.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: 'marsil.png',
    link: 'https://marsil-marcenaria.vercel.app/',
    linkLabel: 'Ver site',
  }
];

function initProjects(){
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  grid.innerHTML = PROJECTS.map(p => `
    <article class="project-card">
      <div class="project-card__media">
        <img src="${p.image}" alt="Captura de tela do projeto ${escapeHtml(p.title)}" loading="lazy">
      </div>
      <div class="project-card__body">
        <div class="project-card__stack">
          ${p.stack.map(s => `<span>${escapeHtml(s)}</span>`).join('')}
        </div>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.description)}</p>
        <a class="project-card__link" href="${p.link}" target="_blank" rel="noopener">${escapeHtml(p.linkLabel)}</a>
        ${p.link2 ? `<a class="project-card__link" href="${p.link2}" target="_blank" rel="noopener">${escapeHtml(p.linkLabel2)}</a>` : ''}
      </div>
    </article>
  `).join('');
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* -------------------------------------------------------------------- */
/* Boot console — typed status log in the hero                          */
/* -------------------------------------------------------------------- */
function initBootConsole(){
  const body = document.getElementById('consoleBody');
  if (!body) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const script = [
    { type: 'prompt', text: 'whoami' },
    { type: 'out',    text: 'Henrique Soares — Full Stack Developer' },
    { type: 'prompt', text: 'stack --list' },
    { type: 'out',    text: 'Java · Node.js · MySQL · HTML/CSS/JS' },
    { type: 'prompt', text: 'status --check' },
    { type: 'ok',     text: 'disponível para novos projetos ✓' }
  ];

  if (reduceMotion){
    body.innerHTML = script.map(renderLine).join('');
    return;
  }

  let i = 0;
  const lineEl = () => {
    const div = document.createElement('div');
    div.className = 'line';
    body.appendChild(div);
    return div;
  };

  function typeLine(){
    if (i >= script.length){
      const caret = document.createElement('span');
      caret.className = 'caret';
      body.appendChild(caret);
      return;
    }
    const item = script[i];
    const el = lineEl();
    const prefix = item.type === 'prompt' ? '<span class="prompt">$ </span>' : '';
    const cls = item.type === 'ok' ? 'ok' : (item.type === 'out' ? 'out' : '');
    let charIndex = 0;
    el.innerHTML = prefix + `<span class="${cls}"></span>`;
    const target = el.querySelector('span:last-child');

    const speed = item.type === 'prompt' ? 55 : 18;
    const timer = setInterval(() => {
      target.textContent += item.text[charIndex];
      charIndex++;
      if (charIndex >= item.text.length){
        clearInterval(timer);
        i++;
        setTimeout(typeLine, item.type === 'prompt' ? 220 : 380);
      }
    }, speed);
  }

  typeLine();
}

function renderLine(item){
  const cls = item.type === 'ok' ? 'ok' : (item.type === 'out' ? 'out' : '');
  const prefix = item.type === 'prompt' ? '<span class="prompt">$ </span>' : '';
  return `<div class="line">${prefix}<span class="${cls}">${item.text}</span></div>`;
}

/* -------------------------------------------------------------------- */
/* Contact form                                                         */
/* -------------------------------------------------------------------- */
function initContactForm(){
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    const fields = [
      { input: form.name, valid: name.length > 1 },
      { input: form.email, valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) },
      { input: form.subject, valid: subject.length > 1 },
      { input: form.message, valid: message.length > 4 }
    ];

    let firstInvalid = null;
    fields.forEach(f => {
      const wrapper = f.input.closest('.field');
      if (!f.valid){
        wrapper.classList.add('field--error');
        if (!firstInvalid) firstInvalid = f.input;
      } else {
        wrapper.classList.remove('field--error');
      }
    });

    if (firstInvalid){
      status.textContent = 'Preencha todos os campos corretamente antes de enviar.';
      status.className = 'form-status is-error';
      firstInvalid.focus();
      return;
    }

    const body = `Nome: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:souzarik659@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    status.textContent = 'Abrindo seu cliente de email com a mensagem pronta...';
    status.className = 'form-status is-success';
    window.location.href = mailto;
  });

  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.closest('.field').classList.remove('field--error');
      status.textContent = '';
      status.className = 'form-status';
    });
  });
}

/* -------------------------------------------------------------------- */
/* Subtle scroll reveal for sections                                    */
/* -------------------------------------------------------------------- */
function initScrollReveal(){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const targets = document.querySelectorAll('.section, .project-card, .skill-card');
  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
}

        const particlesContainer = document.getElementById('particles-container');
        const particleCount = 80;
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size (small)
            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Initial position
            resetParticle(particle);
            
            particlesContainer.appendChild(particle);
            
            // Animate
            animateParticle(particle);
        }
        
        function resetParticle(particle) {
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = '0';
            
            return {
                x: posX,
                y: posY
            };
        }
        
        function animateParticle(particle) {
            // Initial position
            const pos = resetParticle(particle);
            
            // Random animation properties
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            
            // Animate with GSAP-like timing
            setTimeout(() => {
                particle.style.transition = `all ${duration}s linear`;
                particle.style.opacity = Math.random() * 0.3 + 0.1;
                
                // Move in a slight direction
                const moveX = pos.x + (Math.random() * 20 - 10);
                const moveY = pos.y - Math.random() * 30; // Move upwards
                
                particle.style.left = `${moveX}%`;
                particle.style.top = `${moveY}%`;
                
                // Reset after animation completes
                setTimeout(() => {
                    animateParticle(particle);
                }, duration * 1000);
            }, delay * 1000);
        }
        
        // Mouse interaction
        document.addEventListener('mousemove', (e) => {
            // Create particles at mouse position
            const mouseX = (e.clientX / window.innerWidth) * 100;
            const mouseY = (e.clientY / window.innerHeight) * 100;
            
            // Create temporary particle
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Small size
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Position at mouse
            particle.style.left = `${mouseX}%`;
            particle.style.top = `${mouseY}%`;
            particle.style.opacity = '0.6';
            
            particlesContainer.appendChild(particle);
            
            // Animate outward
            setTimeout(() => {
                particle.style.transition = 'all 2s ease-out';
                particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
                particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
                particle.style.opacity = '0';
                
                // Remove after animation
                setTimeout(() => {
                    particle.remove();
                }, 2000);
            }, 10);
            
            // Subtle movement of gradient spheres
            const spheres = document.querySelectorAll('.gradient-sphere');
            const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
            const moveY = (e.clientY / window.innerHeight - 0.5) * 5;
            
            spheres.forEach(sphere => {
                const currentTransform = getComputedStyle(sphere).transform;
                sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });