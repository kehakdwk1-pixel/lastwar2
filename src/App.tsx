// ══════════════════════════════════════
//  종전 후 피어난 개망초 · App.tsx
// ══════════════════════════════════════
import { useEffect, useRef } from 'react'
import './style.css'

// ── 데이터 타입 ──────────────────────
interface StatItem {
  label: string
  val: number
}

interface Character {
  faction: string
  factionClass: 'empire' | 'grad'
  nameEn: string
  nameKo: string
  desc: string
  stats: StatItem[]
  isPlayer?: boolean
}

interface WorldCard {
  num: string
  icon: string
  title: string
  body: string
}

interface TimelineItem {
  year: string
  event: string
  desc: string
  isBlood?: boolean
}

interface ThemeBlock {
  num: string
  title: string
  body: string
}

// ── 상수 데이터 ──────────────────────
const CHARACTERS: Character[] = [
  {
    faction: 'Imperial Empire · 황녀',
    factionClass: 'empire',
    nameEn: 'Elisha Ardelion',
    nameKo: '엘리샤 아르델리온',
    desc: '임페리얼 제국의 황녀. 전쟁 당시 직접 최전선에 참전하여 자신의 호위대와 절친한 벗을 잃었다. 그 이후로 그녀의 눈에서 온기가 사라졌다고 전해진다. 표독하고 냉철하다는 평판 뒤에는, 아직 아물지 않은 상처가 숨겨져 있다. 정략혼을 받아들였으나, 자신을 잃게 한 자와 한지붕 아래 산다는 사실을 단 하루도 잊지 않는다.',
    stats: [
      { label: '냉혹함',   val: 92 },
      { label: '감정억제', val: 88 },
      { label: '전투력',   val: 79 },
      { label: '상처깊이', val: 97 },
    ],
  },
  {
    faction: 'Gradonia · 전쟁 영웅',
    factionClass: 'grad',
    nameEn: '{user}',
    nameKo: '그라도니아의 전쟁 영웅',
    desc: '패전국 그라도니아의 전설적인 전쟁 영웅. 이름만으로도 제국 병사들이 몸서리쳤던 인물이지만, 전쟁의 끝에서 선택할 수 있는 것은 없었다. 조국의 생존을 위해 정략혼을 받아들인 그에게, 황궁은 새로운 전쟁터나 다름없다. 증오하는 자의 집 안에서, 그는 무엇을 지키고 무엇을 버려야 할까.',
    stats: [
      { label: '전투력',   val: 95 },
      { label: '인내심',   val: 85 },
      { label: '관계구축', val: 70 },
      { label: '책임감',   val: 98 },
    ],
    isPlayer: true,
  },
]

const WORLD_CARDS: WorldCard[] = [
  {
    num: 'I',
    icon: '⚜️',
    title: '임페리얼 제국',
    body: '대륙 최강의 군사 제국. 그라도니아와의 전쟁에서 최종 승리를 거두었으며, 평화협정을 통해 주변국에 대한 패권을 공고히 했다. 황실 내부에는 여전히 전쟁의 상흔과 권력 다툼이 존재한다.',
  },
  {
    num: 'II',
    icon: '🗡️',
    title: '그라도니아 왕국',
    body: '한때 제국에 맞설 만한 군사력을 자랑했으나 전쟁에서 패배, 국토의 일부를 잃었다. {user}는 왕국의 마지막 희망으로 정략혼이라는 굴욕을 받아들였다. 민중은 영웅의 선택에 눈물을 흘렸다.',
  },
  {
    num: 'III',
    icon: '📜',
    title: '평화협정',
    body: '전쟁 종결의 상징으로 체결된 협정. 핵심 조건은 황녀 엘리샤와 그라도니아 전쟁 영웅의 혼인이었다. 표면상 평화이나, 두 나라의 긴장은 황궁 안에서도 이어지고 있다.',
  },
]

const TIMELINE: TimelineItem[] = [
  {
    year: '전쟁 발발',
    event: '임페리얼 제국 vs 그라도니아 왕국 — 대전쟁의 시작',
    desc: '대륙의 패권을 둘러싼 두 나라의 충돌. 양측 모두 막대한 희생을 치렀다.',
  },
  {
    year: '전쟁 중 — 비극의 날',
    event: '엘리샤의 호위대 전멸, 절친한 벗의 전사',
    desc: '황녀 엘리샤가 직접 참전한 최전선에서, 그녀의 호위대가 전멸에 가까운 피해를 입었다. 가장 가까운 벗을 잃은 그 날 이후, 엘리샤는 변했다.',
    isBlood: true,
  },
  {
    year: '종전',
    event: '임페리얼 제국 승전 — 그라도니아 항복',
    desc: '전쟁이 끝났다. 그러나 살아남은 자들에게 평화는 또 다른 짐이었다.',
  },
  {
    year: '평화협정',
    event: '황녀 엘리샤 × {user} — 정략결혼 체결',
    desc: '협정의 상징으로 두 사람의 혼인이 결정되었다. 엘리샤는 침묵으로, {user}는 결단으로 서명에 응했다.',
    isBlood: true,
  },
  {
    year: '이야기의 시작',
    event: '{user}, 임페리얼 황궁에 입성',
    desc: '「종전 후」 2번째 이야기. 증오와 전략, 그리고 예상하지 못한 감정이 뒤엉키는 황궁에서의 새로운 전쟁이 시작된다.',
  },
]

const THEMES: ThemeBlock[] = [
  {
    num: '01',
    title: '혐관 — 증오에서 시작되는 관계',
    body: '서로를 적으로 인식하는 두 사람이 같은 지붕 아래 살게 된다면. 증오는 무관심보다 뜨겁다. 엘리샤의 차가운 시선과 가시 돋친 말 뒤에는, 그가 그녀에게 중요한 존재임이 역설적으로 드러난다.',
  },
  {
    num: '02',
    title: '애증 — 가장 복잡한 감정의 지형',
    body: '적으로 마주했던 자를, 시간이 지나며 알아가게 될 때. 미워하고 싶은데 미워할 수만은 없는 순간들이 쌓여간다. 애증은 순애로 가는 가장 험난하고, 그래서 가장 진실한 길이다.',
  },
  {
    num: '03',
    title: '순애 — 결국 남는 단 하나의 감정',
    body: '전략도, 책임도, 증오도 모두 벗겨지고 났을 때. 가장 밑바닥에 남아 있는 것. 이 이야기는 결국 순수한 사랑이 가장 불순한 시작에서 자랄 수 있음을 증명하려 한다.',
  },
  {
    num: '04',
    title: '상처와 이해 — 적의 눈에 비친 나',
    body: '가까운 벗을 잃은 심정을 알 수 있을까. 패자의 설움을 승자가 알 수 있을까. 서로의 상처를 이해할 수 있을까.서로의 아픔을 오해에서 공감으로 바꿔가는 여정이 핵심이다.',
  },
]

// ── 서브 컴포넌트 ─────────────────────

function Hero() {
  return (
    <header>
      <div className="hero-bg" />
      <div className="crest">
        <div className="crest-ring" />
        <div className="crest-ring" />
        <div className="crest-ring" />
      </div>

      <div className="ornament-line"><span>Imperial Chronicles</span></div>
      <p className="hero-label">쿠니오 — 종전 후 시리즈 II</p>

      <h1 className="hero-title">
        종전 후 피어난 개망초
        <span className="accent">After the Last War</span>
      </h1>

      <p className="hero-subtitle">
        승전국의 황녀와 패전국의 영웅. 증오와 전략으로 맺어진 결혼 앞에서,<br />
        두 사람은 서로를 파멸시키거나 — 혹은 구원하거나.
      </p>

      <div className="hero-quote">
        <p>
          이 결혼이 평화를 가져올지, 아니면 더 큰 파멸을 불러올지는<br />
          그땐 그 누구도 알지 못했다
        </p>
      </div>

      <div className="genre-tags">
        {['혐관', '애증', '순애', '정략결혼', '판타지'].map((g) => (
          <span key={g} className="genre-tag">{g}</span>
        ))}
      </div>

      <div className="scroll-hint">
        <span>Scroll</span>
        <div className="scroll-arrow" />
      </div>
    </header>
  )
}

function NavBar() {
  const links = [
    { href: '#synopsis',   label: '시놉시스' },
    { href: '#characters', label: '등장인물' },
    { href: '#world',      label: '세계관'   },
    { href: '#timeline',   label: '연표'     },
    { href: '#themes',     label: '테마'     },
  ]
  return (
    <nav>
      <div className="nav-inner">
        <div className="nav-logo">종전 후 피어난 개망초</div>
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

function Synopsis() {
  return (
    <section id="synopsis">
      <div className="section-eyebrow">Synopsis</div>
      <h2 className="section-title">
        전쟁이 끝난 자리에,<br /><em>또 다른 전쟁이 시작된다</em>
      </h2>

      <div className="synopsis-grid">
        <div className="synopsis-text">
          <p>
            임페리얼 제국과 그라도니아 왕국 사이의 전쟁이 막을 내렸다. 승리를 거머쥔 제국은
            평화협정의 상징으로 한 가지를 요구했다 — 황녀 <strong>엘리샤 아르델리온</strong>과
            그라도니아의 전쟁 영웅의 정략결혼.
          </p>
          <p>
            전쟁터에서 자신의 호위대와 벗을 잃었던 엘리샤에게, 그 영웅의 이름은
            지울 수 없는 증오의 각인이나 다름없었다. 그녀는 결혼을 받아들이면서도
            단 한 가지를 맹세했다 — <strong>절대로 그에게 마음을 열지 않겠다고.</strong>
          </p>
          <p>
            패배한 조국의 미래를 짊어진 채 황궁으로 발을 들인 <strong>{'{'+'user}'+'}'}</strong>.
            그를 기다리는 것은 얼음보다 차가운 황녀의 시선과, 끝나지 않은 전쟁의 잔상이었다.
          </p>
          <p>
            증오와 전략으로 쌓아 올린 결혼이라는 이름의 울타리 안에서,
            두 사람의 거리는 과연 좁혀질 수 있을까.
          </p>
        </div>

        <div className="info-cards">
          <div className="info-card">
            <div className="info-card-label">장르</div>
            <div className="info-card-value genre-list">
              {['혐관', '애증', '순애'].map((g) => (
                <span key={g} className="genre-pill">{g}</span>
              ))}
            </div>
          </div>
          <div className="info-card">
            <div className="info-card-label">배경</div>
            <div className="info-card-value">
              종전 직후의 임페리얼 제국 황궁<br />제국력 N년차, 평화협정 체결 이후
            </div>
          </div>
          <div className="info-card">
            <div className="info-card-label">시리즈</div>
            <div className="info-card-value">「종전 후」 세계관 — 2번째 이야기</div>
          </div>
          <div className="info-card">
            <div className="info-card-label">주요 관계</div>
            <div className="info-card-value">
              정략결혼 → 혐관 → 애증<br />그리고 그 너머로…
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CharCard({ char }: { char: Character }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty('--mx', `${x}%`)
    e.currentTarget.style.setProperty('--my', `${y}%`)
  }

  // 스탯 바 IntersectionObserver
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          card.querySelectorAll<HTMLElement>('.stat-bar').forEach((bar) => {
            const val = bar.getAttribute('data-val')
            setTimeout(() => { bar.style.width = `${val}%` }, 200)
          })
          obs.unobserve(card)
        }
      },
      { threshold: 0.3 },
    )
    obs.observe(card)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={cardRef} className="char-card" onMouseMove={handleMouseMove}>
      {char.isPlayer && <span className="char-user-badge">· Player Character ·</span>}
      <div className={`char-faction ${char.factionClass}`}>{char.faction}</div>
      <div className="char-name">{char.nameEn}</div>
      <div className="char-name-ko">{char.nameKo}</div>
      <p className="char-desc">{char.desc}</p>
      <div className="char-stats">
        {char.stats.map((s) => (
          <div key={s.label} className="stat-row">
            <span className="stat-label">{s.label}</span>
            <div className="stat-bar-wrap">
              <div className="stat-bar" data-val={s.val} style={{ width: 0 }} />
            </div>
            <span className="stat-val">{s.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Characters() {
  return (
    <section id="characters">
      <div className="section-eyebrow">Characters</div>
      <h2 className="section-title"><em>두 사람,</em><br />하나의 전장</h2>

      <div className="characters-grid">
        {CHARACTERS.map((c) => <CharCard key={c.nameEn} char={c} />)}
      </div>

      <div className="user-banner">
        <div className="user-banner-title">· Player Variable ·</div>
        <div className="user-banner-text">
          "패배한 조국을 구하기 위해 임페리얼 제국과의 정략혼을 받아들일 수밖에 없었다.<br />
          나를 증오하는 제국의 황녀, 엘리샤 아르델리온.<br />
          그녀와의 결혼은 마치 끝없는 전쟁의 연장선처럼 느껴졌다."
        </div>
        <div className="user-banner-note">
          ※ {'{'+'user'+'}'} 는 플레이어 교체 가능 캐릭터입니다. 그라도니아의 전쟁 영웅 역할을 맡은 인물로 설정하세요.
        </div>
      </div>
    </section>
  )
}

function World() {
  return (
    <section id="world">
      <div className="section-eyebrow">World</div>
      <h2 className="section-title">두 나라,<br /><em>하나의 상처</em></h2>
      <div className="world-grid">
        {WORLD_CARDS.map((w) => (
          <div key={w.num} className="world-card">
            <div className="world-card-num">{w.num}</div>
            <div className="world-card-icon">{w.icon}</div>
            <div className="world-card-title">{w.title}</div>
            <div className="world-card-body">{w.body}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Timeline() {
  return (
    <section id="timeline">
      <div className="section-eyebrow">Timeline</div>
      <h2 className="section-title">전쟁이 남긴<br /><em>시간의 흔적</em></h2>
      <div className="timeline">
        {TIMELINE.map((t) => (
          <div key={t.year} className={`tl-item${t.isBlood ? ' blood' : ''}`}>
            <div className="tl-year">{t.year}</div>
            <div className="tl-event">{t.event}</div>
            <div className="tl-desc">{t.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Themes() {
  return (
    <section id="themes">
      <div className="section-eyebrow">Themes</div>
      <h2 className="section-title">이 이야기가<br /><em>말하고자 하는 것</em></h2>
      <div className="themes-wrap">
        {THEMES.map((t) => (
          <div key={t.num} className="theme-block" data-num={t.num}>
            <div className="theme-title">{t.title}</div>
            <div className="theme-body">{t.body}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-divider" />
        <div className="footer-title">종전 후 피어난 개망초 · After the Last War</div>
        <div className="footer-sub">쿠니오 — 종전 후 시리즈 II</div>
        <div className="footer-divider" />
      </div>
    </footer>
  )
}

// ── 스크롤 페이드인 훅 ──────────────────
function useFadeInOnScroll(selector: string) {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(selector)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).style.opacity = '1'
            ;(entry.target as HTMLElement).style.transform = 'translateY(0)'
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )
    targets.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(24px)'
      el.style.transition = `opacity 0.8s ease ${i * 0.08}s, transform 0.8s ease ${i * 0.08}s`
      obs.observe(el)
    })
    return () => obs.disconnect()
  }, [selector])
}

// ── 루트 컴포넌트 ──────────────────────
export default function App() {
  useFadeInOnScroll('.world-card, .tl-item, .theme-block, .info-card')

  return (
    <>
      <Hero />
      <NavBar />
      <main>
        <Synopsis />
        <Characters />
        <World />
        <Timeline />
        <Themes />
      </main>
      <Footer />
    </>
  )
}