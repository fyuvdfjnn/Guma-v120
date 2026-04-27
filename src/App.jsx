import { useState } from 'react'
import './App.css'

const heroImages = [
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=420&q=85',
  'https://images.unsplash.com/photo-1496440737103-cd596325d314?auto=format&fit=crop&w=420&q=85',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=420&q=85',
  'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=420&q=85',
]

const popularImages = [
  'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=320&q=85',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=320&q=85',
  'https://images.unsplash.com/photo-1524503033411-c9566986fc8f?auto=format&fit=crop&w=320&q=85',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=320&q=85',
  'https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=320&q=85',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=320&q=85',
  'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=320&q=85',
  'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=320&q=85',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=320&q=85',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=320&q=85',
]

const productPosterImages = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=420&q=85',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=420&q=85',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=420&q=85',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=420&q=85',
]

const ecommercePromoImages = [
  'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=320&q=85',
  'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=320&q=85',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=320&q=85',
  'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=320&q=85',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=320&q=85',
  'https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=320&q=85',
]

const promoVideos = [
  {
    src: '/vedios/8a0eee7c3fee0032a71e7ffacc70bfc5.mp4',
    poster: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=360&q=85',
    refs: ['模特1', '头枕', '场景'],
    prompt: '把 @模特1 作为产品展示主角，结合 @头枕 的舒适卖点和 @场景 的生活氛围，生成一段自然、有质感的产品宣传视频。',
  },
  {
    src: '/vedios/20dd8bd04cb1d5d0c6895080a2f5e222.mp4',
    poster: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=360&q=85',
    refs: ['耳机', '电脑', '平板', '眼睛'],
    prompt: '围绕 @耳机 的核心卖点，搭配 @电脑 和 @平板 的办公场景，并突出 @眼睛 的专注状态，生成科技感强的电商宣传视频。',
  },
  {
    src: '/vedios/6f384a7c45ad9eae1051c43ad36ce571.mp4',
    poster: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=360&q=85',
    refs: ['手机', '场景'],
    prompt: '以 @手机 为主角，结合 @场景 的环境氛围，生成一段突出外观、质感和使用体验的竖屏产品宣传视频。',
  },
]

const actions = [
  { label: '自定义换脸', icon: 'face' },
  { label: 'AI视频', icon: 'video', hot: true },
  { label: 'AI图片', icon: 'image' },
  { label: '动作模仿', icon: 'pose' },
]

const tabs = [
  { label: '首页', icon: 'home' },
  { label: 'Agent', icon: 'spark' },
  { label: '精选', icon: 'star', badge: 'New' },
  { label: '我的', icon: 'me' },
]

const pageContent = {
  首页: {
    firstTitle: '每日更新',
    firstSubtitle: '精美模板，每日更新⁰ ᴗ ᴗꕀ',
    secondTitle: '热门',
    secondSubtitle: '现在SNS上最火的氛围。 🔥',
  },
  Agent: {
    firstTitle: '产品海报',
    firstSubtitle: '一键生成高级商品展示图。',
    secondTitle: '电商宣传图',
    secondSubtitle: '适合店铺上新和活动推广。',
  },
}

function App() {
  const [activeTab, setActiveTab] = useState('首页')
  const [screen, setScreen] = useState('home')
  const [detail, setDetail] = useState(null)
  const [videoPrompt, setVideoPrompt] = useState(null)
  const content = pageContent[activeTab] ?? pageContent.首页
  const firstImages = activeTab === 'Agent' ? productPosterImages : heroImages
  const secondImages = activeTab === 'Agent' ? ecommercePromoImages : popularImages

  if (screen === 'video') {
    return <AiVideoPage onBack={() => setScreen('home')} promptData={videoPrompt} />
  }

  if (screen === 'image') {
    return <AiImagePage onBack={() => setScreen('home')} />
  }

  if (screen === 'detail') {
    return <AgentDetailPage
      detail={detail}
      onBack={() => setScreen('home')}
      onCreate={(promptData) => {
        setVideoPrompt(promptData)
        setScreen('video')
      }}
    />
  }

  return (
    <main className="phone-shell">
      <div className="status-bar">
        <span>16:29</span>
        <div className="system-icons">
          <span className="signal">••••</span>
          <span className="wifi">⌁</span>
          <span className="battery">100</span>
        </div>
      </div>

      <header className="top-bar">
        <h1>Guma</h1>
        <div className="header-actions">
          <button className="pro-button">PRO</button>
          <button className="search-button" aria-label="搜索">
            <Icon type="search" />
          </button>
        </div>
      </header>

      <section className="quick-actions">
        {actions.map((item) => (
          <button
            className="quick-item"
            key={item.label}
            onClick={() => {
              if (item.label === 'AI视频') setScreen('video')
              if (item.label === 'AI图片') setScreen('image')
            }}
          >
            <span className="quick-icon">
              {item.hot && <span className="hot-badge">HOT</span>}
              <Icon type={item.icon} />
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </section>

      <TemplateSection title={content.firstTitle} subtitle={content.firstSubtitle} layout="row">
        {firstImages.map((src, index) => (
          <ImageCard
            key={`${activeTab}-${src}`}
            src={src}
            className={index === 3 ? 'peek' : ''}
            onClick={activeTab === 'Agent' ? () => {
              setDetail({ src, title: '产品海报', subtitle: '高级商品展示', caption: '一键生成产品大片' })
              setScreen('detail')
            } : undefined}
          />
        ))}
      </TemplateSection>

      <TemplateSection title={content.secondTitle} subtitle={content.secondSubtitle} layout="popular">
        {secondImages.map((src) => (
          <ImageCard
            key={`${activeTab}-${src}`}
            src={src}
            onClick={activeTab === 'Agent' ? () => {
              setDetail({ src, title: '电商宣传图', subtitle: '店铺上新推广', caption: '快速生成商品宣传图' })
              setScreen('detail')
            } : undefined}
          />
        ))}
      </TemplateSection>

      {activeTab === 'Agent' && (
        <TemplateSection title="宣传视频" subtitle="适合产品卖点展示和社媒投放。" layout="video">
          {promoVideos.map((video) => (
            <VideoCard
              key={`${video.src}-${video.poster}`}
              video={video}
              onClick={() => {
                setDetail({ src: video.src, poster: video.poster, type: 'video', title: '宣传视频', subtitle: '产品卖点展示', caption: '一键生成产品宣传视频', refs: video.refs, prompt: video.prompt })
                setScreen('detail')
              }}
            />
          ))}
        </TemplateSection>
      )}

      <nav className="bottom-nav">
        {tabs.map((tab) => (
          <button
            className={activeTab === tab.label ? 'active' : ''}
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.badge && <span className="new-badge">{tab.badge}</span>}
            <span className="tab-icon"><Icon type={tab.icon} /></span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </main>
  )
}

function AgentDetailPage({ detail, onBack, onCreate }) {
  const item = detail ?? {
    src: productPosterImages[0],
    title: '产品海报',
    subtitle: '高级商品展示',
    caption: '一键生成产品大片',
  }

  const bgSrc = item.type === 'video' ? item.poster : item.src

  return (
    <main className="detail-screen">
      <img className="detail-bg" src={bgSrc} alt="" />
      <div className="detail-overlay"></div>
      <div className="status-bar detail-status">
        <span>18:15</span>
        <div className="system-icons">
          <span className="signal">••••</span>
          <span className="wifi">⌁</span>
          <span className="battery">92</span>
        </div>
      </div>

      <header className="detail-header">
        <button className="detail-round-button" onClick={onBack} aria-label="返回">
          <Icon type="back" />
        </button>
        <button className="detail-round-button" aria-label="更多">
          <Icon type="more" />
        </button>
      </header>

      <section className="detail-content">
        <h1>{item.title}</h1>
        <p>{item.subtitle}</p>
        <div className="detail-card">
          {item.type === 'video' ? (
            <video src={item.src} poster={item.poster} autoPlay muted loop playsInline />
          ) : (
            <img src={item.src} alt={item.title} />
          )}
          <div className="detail-caption">{item.caption}</div>
        </div>
        <button
          className="detail-create"
          onClick={() => item.type === 'video' && onCreate?.({ refs: item.refs, prompt: item.prompt })}
        >
          一键制作
        </button>
      </section>
    </main>
  )
}

function AiImagePage({ onBack }) {
  return (
    <main className="image-screen">
      <div className="status-bar video-status">
        <span>17:13</span>
        <div className="system-icons">
          <span className="signal">••••</span>
          <span className="wifi">⌁</span>
          <span className="battery">95</span>
        </div>
      </div>

      <header className="video-header image-header">
        <button className="back-button" onClick={onBack} aria-label="返回">
          <Icon type="back" />
        </button>
        <h1>AI 图片</h1>
      </header>

      <section className="image-hero">
        <span className="star star-one">✦</span>
        <span className="star star-two">✦</span>
        <span className="star star-three">✦</span>
        <span className="star star-four">✦</span>

        <button className="image-upload-card" aria-label="上传参考图">
          <span>+</span>
          <strong>参考图</strong>
        </button>

        <div className="image-prompt">请描述图片场景，例如：生成一张活动海报 <button><Icon type="idea" /></button></div>
      </section>

      <div className="generate-row image-generate-row">
        <div className="summary-pill">
          <span>GPT Image 2</span>
          <i></i>
          <span>Qty:1</span>
          <i></i>
          <span>2:3</span>
          <Icon type="swap" />
        </div>
        <div className="coins"><span>●</span>100/Img</div>
        <button className="create-button">一键制作</button>
      </div>

      <section className="settings-panel image-settings-panel">
        <OptionGroup title="模型" options={['GPT Image 2', 'Nano Banana', 'Nano Banana Pro']} activeIndex={0} withOpenAi />
        <ImageRatioGroup />
        <OptionGroup title="数量" options={['4', '3', '2', '1']} activeIndex={3} compact />
        <ResolutionSlider />
      </section>
    </main>
  )
}

function ImageRatioGroup() {
  const ratios = [
    { label: '2:3', className: 'portrait' },
    { label: '1:1', className: 'square' },
    { label: '3:2', className: 'landscape' },
    { label: 'Auto', className: 'auto' },
  ]

  return (
    <div className="option-group ratio-group">
      <h2>比例</h2>
      <div className="ratio-list">
        {ratios.map((ratio, index) => (
          <button className={index === 0 ? 'selected' : ''} key={ratio.label}>
            <span className={`ratio-icon ${ratio.className}`}></span>
            <strong>{ratio.label}</strong>
          </button>
        ))}
      </div>
    </div>
  )
}

function ResolutionSlider() {
  return (
    <div className="option-group resolution-slider-group">
      <h2>分辨率</h2>
      <div className="resolution-slider"><span>HD 1K</span></div>
    </div>
  )
}

function AiVideoPage({ onBack, promptData }) {
  return (
    <main className="video-screen">
      <div className="status-bar video-status">
        <span>17:13</span>
        <div className="system-icons">
          <span className="signal">••••</span>
          <span className="wifi">⌁</span>
          <span className="battery">95</span>
        </div>
      </div>

      <header className="video-header">
        <button className="back-button" onClick={onBack} aria-label="返回">
          <Icon type="back" />
        </button>
        <h1>AI视频</h1>
      </header>

      <section className="video-hero">
        <span className="star star-one">✦</span>
        <span className="star star-two">✦</span>
        <span className="star star-three">✦</span>
        <span className="star star-four">✦</span>

        <div className="video-tabs">
          <button className="selected">全能参考<span></span></button>
          <button>文本或图片</button>
          <button>首尾帧</button>
        </div>

        {promptData ? (
          <VideoPromptBox refs={promptData.refs} prompt={promptData.prompt} />
        ) : (
          <>
            <button className="upload-card" aria-label="上传素材">+</button>

            <p className="prompt-copy">
              上传最多12个参考素材、输入文字或 <em>@</em> 参考内容，自由组合图、文、音、视频多元素，定义精彩互动。例如:@图片1 模仿 @视频1 的动作，音色参考 @音频1
            </p>
          </>
        )}
      </section>

      <div className="generate-row">
        <div className="summary-pill">
          <span>Seedance2.0 PRO</span>
          <i></i>
          <span>480P</span>
          <i></i>
          <span>5s</span>
          <Icon type="swap" />
        </div>
        <div className="coins"><span>●</span>200</div>
        <button className="create-button">一键制作</button>
      </div>

      <section className="settings-panel">
        <OptionGroup title="Model" options={['Seedance2.0 PRO', 'Seedance 2.0 Fast']} activeIndex={0} withLogo />
        <OptionGroup title="Resolution" options={['480P', '720P', '1080P']} activeIndex={0} />
        <OptionGroup title="Duration" options={['5s', '10s', '15s']} activeIndex={0} />
      </section>
    </main>
  )
}

function VideoPromptBox({ refs = [], prompt }) {
  return (
    <div className="video-prompt-box">
      <div className="ref-strip">
        {refs.map((ref) => (
          <div className="ref-card" key={ref}>
            <button>×</button>
            <span>@{ref}</span>
          </div>
        ))}
        <div className="ref-add">+<span>添加</span></div>
      </div>
      <p>
        {prompt.split(/(@[^，。\s]+)/g).map((part, index) => (
          part.startsWith('@') ? <span className="prompt-tag" key={`${part}-${index}`}>{part}</span> : part
        ))}
      </p>
      <button className="reset-button"><Icon type="reset" />重置</button>
    </div>
  )
}

function OptionGroup({ title, options, activeIndex, withLogo = false, withOpenAi = false, compact = false }) {
  return (
    <div className="option-group">
      <h2>{title}</h2>
      <div className={`option-list${compact ? ' compact' : ''}`}>
        {options.map((option, index) => (
          <button className={index === activeIndex ? 'selected' : ''} key={option}>
            {withLogo && <span className="model-logo">◔</span>}
            {withOpenAi && (index === 0 ? <span className="openai-logo">◎</span> : <span className="model-logo">◔</span>)}
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

function TemplateSection({ title, subtitle, layout, children }) {
  const className = layout === 'popular' ? 'popular-row' : layout === 'video' ? 'video-row' : 'image-row'

  return (
    <section className="template-section">
      <div className="section-heading">
        <h2>{title}<span>›</span></h2>
        <p>{subtitle}</p>
      </div>
      <div className={className}>{children}</div>
    </section>
  )
}

function ImageCard({ src, className = '', onClick }) {
  if (onClick) {
    return <button className={`image-card-button ${className}`} onClick={onClick}><img src={src} alt="模板" /></button>
  }

  return <img className={`image-card ${className}`} src={src} alt="模板" />
}

function VideoCard({ video, onClick }) {
  const content = (
    <>
      <img src={video.poster} alt="宣传视频封面" />
      <video className="video-card" src={video.src} autoPlay muted loop playsInline poster={video.poster} />
      <span className="play-mark">▶</span>
    </>
  )

  if (onClick) {
    return <button className="video-card-wrap" onClick={onClick}>{content}</button>
  }

  return <div className="video-card-wrap">{content}</div>
}

function Icon({ type }) {
  const icons = {
    search: <path d="M11 19a8 8 0 1 1 5.66-2.34L21 21l-2 2-4.38-4.36A7.96 7.96 0 0 1 11 19Zm0-3a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />,
    back: <path d="M15.7 4.3 8 12l7.7 7.7-2.4 2.3L3.3 12l10-10 2.4 2.3Z" />,
    swap: <path d="M7 7h12v2H7l2.4 2.4L8 12.8 3.2 8 8 3.2l1.4 1.4L7 7Zm10 10H5v-2h12l-2.4-2.4L16 11.2l4.8 4.8-4.8 4.8-1.4-1.4L17 17Z" />,
    idea: <path d="M12 3a6 6 0 0 0-3.2 11.1c.5.3.7.8.7 1.4V16h5v-.5c0-.6.3-1.1.7-1.4A6 6 0 0 0 12 3Zm-2 15h4v2h-4v-2Zm1-8 1-3 1 3 3 1-3 1-1 3-1-3-3-1 3-1Z" />,
    more: <path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />,
    reset: <path d="M6.4 6.4A8 8 0 1 1 4 12H2a10 10 0 1 0 3-7.1L3 3v6h6L6.4 6.4Z" />,
    face: <path d="M5 5h7v2H7v5H5V5Zm12 0h2v7h-2V7h-5V5h5ZM7 17h5v2H5v-7h2v5Zm12-5v7h-7v-2h5v-5h2ZM9 10h2v2H9v-2Zm6 0h2v2h-2v-2Zm-6 5c2 1.6 5 1.6 7 0l1.1 1.7c-2.9 2.2-6.3 2.2-9.2 0L9 15Z" />,
    video: <path d="M4 6h10a2 2 0 0 1 2 2v2.2l4-2.5v8.6l-4-2.5V16a2 2 0 0 1-2 2H4V6Zm2 2v8h8V8H6Zm2-5 1.2 2.3L12 6 9.2 6.7 8 9 6.8 6.7 4 6l2.8-.7L8 3Zm10 0 .8 1.6 1.7.4-1.7.4L18 7l-.8-1.6-1.7-.4 1.7-.4L18 3Z" />,
    image: <path d="M5 5h14v14H5V5Zm2 2v9l3.8-4.2 3 3.3 1.8-2.1L17 14.6V7H7Zm8.5 1.8a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4Zm2-5.8.8 1.6 1.7.4-1.7.4-.8 1.6-.8-1.6L15 5l1.7-.4.8-1.6Z" />,
    pose: <path d="M13 4.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM7 9l3.4 1.6 4.6-2 1 2.1-4.4 1.9v3.1L15 20l-2 1.4-3.2-4.2-2.2 4.6-2.2-1 3.4-7.1L5.9 12 7 9Zm11-3 .6 1.2 1.4.3-1.4.3L18 9l-.6-1.2-1.4-.3 1.4-.3L18 6Z" />,
    home: <path d="M4 11.5 12 5l8 6.5V20H7a3 3 0 0 1-3-3v-5.5Zm8 4.5c2.4 0 4.2-.9 5.3-2.5l-2-.9c-.7.8-1.8 1.2-3.3 1.2s-2.6-.4-3.3-1.2l-2 .9C7.8 15.1 9.6 16 12 16Z" />,
    star: <path d="m12 3 2.7 5.4 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6-4.3-4.2 6-.9L12 3Z" />,
    spark: <path d="M12 3c1.1 4.1 2.9 5.9 7 7-4.1 1.1-5.9 2.9-7 7-1.1-4.1-2.9-5.9-7-7 4.1-1.1 5.9-2.9 7-7Z" />,
    me: <path d="M8 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm-9 4.5c2.4 2.6 7.6 2.6 10 0l1.5 1.3c-3.2 3.7-9.8 3.7-13 0L7 14.5ZM12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Z" />,
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true">{icons[type]}</svg>
}

export default App
