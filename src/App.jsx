import { useEffect, useRef, useState } from 'react'
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
    refs: [
      { label: '模特1', image: '/vedios/模特1.png' },
      { label: '头枕', image: '/vedios/头枕.png' },
      { label: '场景', image: '/vedios/场景.jpg' },
    ],
    prompt: '把 @模特1 作为产品展示主角，结合 @头枕 的舒适卖点和 @场景 的生活氛围，生成一段自然、有质感的产品宣传视频。',
  },
  {
    src: '/vedios/20dd8bd04cb1d5d0c6895080a2f5e222.mp4',
    poster: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=360&q=85',
    refs: [
      { label: '耳机', image: '/vedios/耳机.jpg' },
      { label: '电脑', image: '/vedios/电脑.jpg' },
      { label: '平板', image: '/vedios/平板.jpg' },
      { label: '眼睛', image: '/vedios/眼睛.jpg' },
    ],
    prompt: '围绕 @耳机 的核心卖点，搭配 @电脑 和 @平板 的办公场景，并突出 @眼睛 的专注状态，生成科技感强的电商宣传视频。',
  },
  {
    src: '/vedios/6f384a7c45ad9eae1051c43ad36ce571.mp4',
    poster: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=360&q=85',
    refs: [
      { label: '手机', image: '/vedios/手机.jpg' },
      { label: '场景', image: '/vedios/背景.jpg' },
    ],
    prompt: '以 @手机 为主角，结合 @场景 的环境氛围，生成一段突出外观、质感和使用体验的竖屏产品宣传视频。',
  },
]

const agentCarouselVideos = [...promoVideos].reverse()

const pickerBaseImages = [
  ...promoVideos.flatMap((video) => video.refs.map((ref) => ref.image)),
  ...productPosterImages,
  ...ecommercePromoImages,
  ...heroImages,
  ...popularImages,
]

const pickerHistoryImages = repeatImages(pickerBaseImages, 12)
const pickerAlbumImages = repeatImages(pickerBaseImages.slice(2), 16)
const pickerSubjectImages = repeatImages([
  ...productPosterImages,
  ...ecommercePromoImages,
  ...heroImages,
  ...popularImages,
], 24)

const pickerSubjectTabs = ['全部', '角色', '动物', '道具', '服饰']
const ecommerceRatioOptions = ['3:4', '4:3', '1:1']

const ecommerceFacePresets = [
  { src: heroImages[0], label: '人物 1' },
  { src: heroImages[1], label: '人物 2' },
  { src: heroImages[2], label: '人物 3' },
  { src: heroImages[3], label: '人物 4' },
  { src: popularImages[1], label: '人物 5' },
  { src: popularImages[3], label: '人物 6' },
]

const ecommerceScenePresets = [
  { src: ecommercePromoImages[0], label: '场景 1' },
  { src: ecommercePromoImages[1], label: '场景 2' },
  { src: ecommercePromoImages[2], label: '场景 3' },
  { src: ecommercePromoImages[3], label: '场景 4' },
  { src: ecommercePromoImages[4], label: '场景 5' },
  { src: ecommercePromoImages[5], label: '场景 6' },
]

const createSubjectTagOptions = ['角色', '动物', '产品', '场景', '服饰', '道具', '其他']

const actions = [
  { label: '自定义换脸', icon: 'face' },
  { label: 'AI视频', icon: 'video', badge: 'Seedance 2' },
  { label: 'AI图片', icon: 'image', badge: 'Image 2' },
  { label: '动作模仿', icon: 'pose' },
]

const businessActions = [
  { label: 'Agent', icon: 'assets' },
  ...actions,
]

const tabs = [
  { label: '首页', icon: 'home' },
  { label: 'Business', icon: 'briefcase' },
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
  Business: {
    firstTitle: '产品海报',
    firstSubtitle: '一键生成高级商品展示图。',
    secondTitle: '电商宣传图',
    secondSubtitle: '适合店铺上新和活动推广。',
  },
}

const mineGalleryImages = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=520&q=85',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=520&q=85&sat=-10&hue=40',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=520&q=85',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=520&q=85',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=520&q=85',
  'https://images.unsplash.com/photo-1524503033411-c9566986fc8f?auto=format&fit=crop&w=520&q=85',
]

const businessImagePrompts = {
  poster: {
    refs: [
      { label: '产品', image: productPosterImages[0] },
      { label: '场景', image: heroImages[1] },
      { label: '灯光', image: ecommercePromoImages[0] },
    ],
    prompt: '以 @产品 为视觉中心，结合 @场景 的高级陈列氛围和 @灯光 的质感表现，生成一张适合品牌投放的产品海报。',
  },
  ecommerce: {
    refs: [
      { label: '商品', image: ecommercePromoImages[1] },
      { label: '模特', image: heroImages[0] },
      { label: '卖点', image: productPosterImages[2] },
    ],
    prompt: '围绕 @商品 的核心卖点，结合 @模特 的展示动作和 @卖点 的电商包装方式，生成一张适合店铺上新的宣传图。',
  },
}

function replacePromptRef(promptData, index, image) {
  if (!promptData?.refs?.[index]) return promptData

  const nextLabel = `素材${index + 1}`
  const previousLabel = promptData.refs[index].label
  const escapedLabel = previousLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const nextPrompt = (promptData.prompt ?? '').replace(new RegExp(`@${escapedLabel}`, 'g'), `@${nextLabel}`)
  const nextRefs = promptData.refs.map((ref, refIndex) => (
    refIndex === index ? { label: nextLabel, image } : ref
  ))

  return {
    ...promptData,
    refs: nextRefs,
    prompt: nextPrompt,
  }
}

function removePromptRef(promptData, index) {
  if (!promptData?.refs?.[index]) return promptData

  const removedLabel = promptData.refs[index].label
  const escapedLabel = removedLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const nextRefs = promptData.refs.filter((_, refIndex) => refIndex !== index)
    .map((ref, refIndex) => ({
      ...ref,
      label: `素材${refIndex + 1}`,
    }))
  let nextPrompt = (promptData.prompt ?? '').replace(new RegExp(`@${escapedLabel}`, 'g'), '')

  promptData.refs.forEach((ref, refIndex) => {
    if (refIndex === index) return
    const currentLabel = `素材${refIndex + 1}`
    const nextLabel = nextRefs[refIndex > index ? refIndex - 1 : refIndex]?.label
    if (!nextLabel || currentLabel === nextLabel) return
    nextPrompt = nextPrompt.replace(new RegExp(`@${currentLabel}`, 'g'), `@${nextLabel}`)
  })

  nextPrompt = nextPrompt.replace(/\s{2,}/g, ' ').replace(/(^\s+|\s+$)/g, '')

  return {
    ...promptData,
    refs: nextRefs,
    prompt: nextPrompt,
  }
}

function TokenPill({ compact = false }) {
  return (
    <div className={`mine-token-pill${compact ? ' mine-token-pill-compact' : ''}`}>
      <span className={`mine-token-icon${compact ? ' mine-token-icon-compact' : ''}`}>✦</span>
      <strong>96750</strong>
    </div>
  )
}

function App() {
  useMobileScale()

  const [activeTab, setActiveTab] = useState('首页')
  const [screen, setScreen] = useState('home')
  const [detail, setDetail] = useState(null)
  const [videoPrompt, setVideoPrompt] = useState(null)
  const [imagePrompt, setImagePrompt] = useState(null)
  const [pickerLibrary, setPickerLibrary] = useState('album')
  const [pickerSelection, setPickerSelection] = useState([])
  const [pickerTarget, setPickerTarget] = useState('video')
  const [pickerReturnScreen, setPickerReturnScreen] = useState('video')
  const [isPosterUploadSheetOpen, setIsPosterUploadSheetOpen] = useState(false)
  const [posterUploadContext, setPosterUploadContext] = useState(null)
  const [createSubjectReturnScreen, setCreateSubjectReturnScreen] = useState('picker')
  const [pickerMode, setPickerMode] = useState('all')
  const [subjectLibraryCategory, setSubjectLibraryCategory] = useState(pickerSubjectTabs[0])
  const [subjectTag, setSubjectTag] = useState(createSubjectTagOptions[0])
  const [subjectTagMenuOpen, setSubjectTagMenuOpen] = useState(false)
  const [createSubjectImage, setCreateSubjectImage] = useState('/vedios/耳机.jpg')
  const [createSubjectExtraImages, setCreateSubjectExtraImages] = useState([])
  const [subjectEnhanceSelection, setSubjectEnhanceSelection] = useState(0)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [pickerReplaceTarget, setPickerReplaceTarget] = useState(null)
  const [isSubjectDeleteDialogOpen, setIsSubjectDeleteDialogOpen] = useState(false)
  const [businessPosterImage, setBusinessPosterImage] = useState(productPosterImages[0])
  const [ecommerceElementsImage, setEcommerceElementsImage] = useState(ecommercePromoImages[0])
  const [ecommerceFaceImage, setEcommerceFaceImage] = useState(heroImages[3])
  const [ecommerceSceneImage, setEcommerceSceneImage] = useState(ecommercePromoImages[2])
  const [ecommerceReplaceSheet, setEcommerceReplaceSheet] = useState(null)
  const [ecommerceRatio, setEcommerceRatio] = useState('3:4')
  const [ecommerceRatioMenuOpen, setEcommerceRatioMenuOpen] = useState(false)
  const [productLinkMode, setProductLinkMode] = useState('link')
  const [productLinkSampleFilled, setProductLinkSampleFilled] = useState(false)
  const [businessHeroExpanded, setBusinessHeroExpanded] = useState(true)
  const [businessHeroOffset, setBusinessHeroOffset] = useState(0)
  const businessGestureRef = useRef({ startX: 0, startY: 0, pointerId: null, dragging: false, fromExpanded: true })
  const [mineCategory, setMineCategory] = useState('历史创作')
  useResetViewportScroll(screen, activeTab)
  const content = pageContent[activeTab] ?? pageContent.首页
  const isBusinessTab = activeTab === 'Business'
  const quickActionItems = isBusinessTab ? businessActions : actions
  const businessHeroHeight = 188
  const handleBusinessQuickActionsPointerDown = (event) => {
    businessGestureRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      pointerId: event.pointerId,
      dragging: true,
      fromExpanded: businessHeroExpanded,
    }
  }
  const handleBusinessQuickActionsPointerMove = (event) => {
    const gesture = businessGestureRef.current
    if (!gesture.dragging || gesture.pointerId !== event.pointerId) return

    const deltaX = event.clientX - gesture.startX
    const deltaY = event.clientY - gesture.startY

    if (Math.abs(deltaY) <= Math.abs(deltaX) * 0.75) return

    const nextOffset = gesture.fromExpanded
      ? Math.min(Math.max(-deltaY, 0), businessHeroHeight)
      : Math.min(Math.max(deltaY, 0), businessHeroHeight)

    setBusinessHeroOffset(nextOffset)

    if (nextOffset >= businessHeroHeight / 2) {
      setBusinessHeroExpanded(!gesture.fromExpanded)
      setBusinessHeroOffset(0)
      businessGestureRef.current = { startX: 0, startY: 0, pointerId: null, dragging: false, fromExpanded: !gesture.fromExpanded }
    }
  }
  const resetBusinessGesture = () => {
    businessGestureRef.current = { startX: 0, startY: 0, pointerId: null, dragging: false, fromExpanded: businessHeroExpanded }
    setBusinessHeroOffset(0)
  }
  const handleBusinessQuickActionsPointerUp = (event) => {
    const gesture = businessGestureRef.current
    if (gesture.pointerId !== event.pointerId) return
    resetBusinessGesture()
  }
  const firstImages = isBusinessTab
    ? [
        { src: promoVideos[0].poster, detailMedia: { src: promoVideos[0].src, poster: promoVideos[0].poster, type: 'video' } },
        { src: productPosterImages[1], detailMedia: { src: productPosterImages[1], type: 'image' } },
        { src: productPosterImages[2], detailMedia: { src: productPosterImages[2], type: 'image' } },
        { src: productPosterImages[3], detailMedia: { src: productPosterImages[3], type: 'image' } },
      ]
    : heroImages.map((src) => ({ src, detailMedia: { src, type: 'image' } }))
  const secondImages = isBusinessTab
    ? [
        { src: promoVideos[2].poster, detailMedia: { src: promoVideos[2].src, poster: promoVideos[2].poster, type: 'video' } },
        { src: ecommercePromoImages[1], detailMedia: { src: ecommercePromoImages[1], type: 'image' } },
        { src: ecommercePromoImages[2], detailMedia: { src: ecommercePromoImages[2], type: 'image' } },
        { src: ecommercePromoImages[3], detailMedia: { src: ecommercePromoImages[3], type: 'image' } },
        { src: ecommercePromoImages[4], detailMedia: { src: ecommercePromoImages[4], type: 'image' } },
        { src: ecommercePromoImages[5], detailMedia: { src: ecommercePromoImages[5], type: 'image' } },
      ]
    : popularImages.slice(0, 9).map((src) => ({ src, detailMedia: { src, type: 'image' } }))

  if (screen === 'video') {
    return <MobileFrame><AiVideoPage onBack={() => setScreen('home')} promptData={videoPrompt} onOpenPicker={() => {
      setPickerTarget('video')
      setPickerReturnScreen('video')
      setPickerReplaceTarget(null)
      setPickerMode('all')
      setPickerLibrary('album')
      setPickerSelection([])
      setScreen('picker')
    }} onReplaceRef={(index) => {
      setPickerTarget('video')
      setPickerReturnScreen('video')
      setPickerReplaceTarget(index)
      setPickerMode('all')
      setPickerLibrary('album')
      setPickerSelection([])
      setScreen('picker')
    }} onRemoveRef={(index) => {
      setVideoPrompt((current) => removePromptRef(current, index))
    }} /></MobileFrame>
  }

  if (screen === 'image') {
    return <MobileFrame><AiImagePage onBack={() => setScreen('home')} promptData={imagePrompt} onOpenPicker={() => {
      setPickerTarget('image')
      setPickerReturnScreen('image')
      setPickerReplaceTarget(null)
      setPickerMode('all')
      setPickerLibrary('album')
      setPickerSelection([])
      setScreen('picker')
    }} onReplaceRef={(index) => {
      setPickerTarget('image')
      setPickerReturnScreen('image')
      setPickerReplaceTarget(index)
      setPickerMode('all')
      setPickerLibrary('album')
      setPickerSelection([])
      setScreen('picker')
    }} onRemoveRef={(index) => {
      setImagePrompt((current) => removePromptRef(current, index))
    }} onCreate={() => setScreen('agent-page')} /></MobileFrame>
  }

  if (screen === 'picker') {
    return <MobileFrame><ReferencePickerPage
      library={pickerLibrary}
      mode={pickerMode}
      subjectCategory={subjectLibraryCategory}
      selectedImages={pickerSelection}
      onBack={() => {
        setIsPosterUploadSheetOpen(false)
        setPosterUploadContext(null)
        setScreen(pickerReturnScreen)
      }}
      onLibraryChange={setPickerLibrary}
      onSubjectCategoryChange={setSubjectLibraryCategory}
      onToggleImage={(image) => {
        setPickerSelection((current) => current.includes(image)
          ? current.filter((item) => item !== image)
          : [...current, image]
        )
      }}
      onNext={() => {
        if (pickerSelection.length === 0) {
          setScreen(pickerTarget)
          return
        }

        const additions = pickerSelection.map((image, index) => ({
          label: `素材${index + 1}`,
          image,
        }))

        if (pickerTarget === 'create-subject-extra') {
          setCreateSubjectExtraImages((current) => [...current, ...pickerSelection].slice(0, 8))
          setScreen('create-subject')
          return
        }

        if (pickerTarget === 'image') {
          setImagePrompt((current) => {
            if (pickerReplaceTarget !== null) {
              return replacePromptRef(current, pickerReplaceTarget, pickerSelection[0])
            }

            const existing = current?.refs ?? []
            const nextAdditions = additions.map((item, index) => ({
              ...item,
              label: `素材${existing.length + index + 1}`,
            }))

            return current
              ? { ...current, refs: [...existing, ...nextAdditions] }
              : {
                  refs: nextAdditions,
                  prompt: nextAdditions.map((item) => `@${item.label}`).join(' '),
                }
          })
          setPickerReplaceTarget(null)
          setIsPosterUploadSheetOpen(false)
          setPosterUploadContext(null)

          if (pickerReturnScreen === 'home') {
            setBusinessPosterImage(pickerSelection[0])
            setProductLinkMode('link')
            setScreen('product-link')
            return
          }

          if (pickerReturnScreen === 'ecommerce-elements') {
            if (ecommerceReplaceSheet === 'face') {
              setEcommerceFaceImage(pickerSelection[0])
            } else if (ecommerceReplaceSheet === 'scene') {
              setEcommerceSceneImage(pickerSelection[0])
            } else {
              setEcommerceElementsImage(pickerSelection[0])
            }
            setScreen('ecommerce-elements')
            return
          }

          setScreen(pickerReturnScreen === 'agent-page' ? 'agent-page' : 'image')
          return
        }

        setVideoPrompt((current) => {
          if (pickerReplaceTarget !== null) {
            return replacePromptRef(current, pickerReplaceTarget, pickerSelection[0])
          }

          const existing = current?.refs ?? []
          const nextAdditions = additions.map((item, index) => ({
            ...item,
            label: `素材${existing.length + index + 1}`,
          }))

          return current
            ? { ...current, refs: [...existing, ...nextAdditions] }
            : {
                refs: nextAdditions,
                prompt: nextAdditions.map((item) => `@${item.label}`).join(' '),
              }
        })
        setPickerReplaceTarget(null)
        setScreen('video')
      }}
      onCreateSubject={() => {
        setCreateSubjectReturnScreen('picker')
        setScreen('create-subject')
      }}
    /></MobileFrame>
  }

  if (screen === 'create-subject') {
    return <MobileFrame><CreateSubjectPage
      tag={subjectTag}
      imageSrc={createSubjectImage}
      extraImages={createSubjectExtraImages}
      isTagMenuOpen={subjectTagMenuOpen}
      onBack={() => {
        setSubjectTagMenuOpen(false)
        setScreen(createSubjectReturnScreen)
      }}
      onToggleTagMenu={() => setSubjectTagMenuOpen((current) => !current)}
      onSelectTag={(nextTag) => {
        setSubjectTag(nextTag)
        setSubjectTagMenuOpen(false)
      }}
      onOpenAlbumPicker={() => {
        setSubjectTagMenuOpen(false)
        setPickerTarget('create-subject')
        setPickerReturnScreen('create-subject')
        setPickerMode('album-only')
        setPickerLibrary('album')
        setPickerSelection([])
        setScreen('picker')
      }}
      onOpenExtraPicker={() => {
        setSubjectTagMenuOpen(false)
        setPickerTarget('create-subject-extra')
        setPickerReturnScreen('create-subject')
        setPickerMode('album-only')
        setPickerLibrary('album')
        setPickerSelection([])
        setScreen('picker')
      }}
      onDeletePrimary={() => {
        if (createSubjectExtraImages.length > 0) {
          const [nextPrimary, ...rest] = createSubjectExtraImages
          setCreateSubjectImage(nextPrimary)
          setCreateSubjectExtraImages(rest)
          return
        }

        setCreateSubjectImage('/vedios/耳机.jpg')
      }}
      onDeleteExtra={(index) => {
        setCreateSubjectExtraImages((current) => current.filter((_, itemIndex) => itemIndex !== index))
      }}
      onOpenSmartFill={() => {
        setSubjectTagMenuOpen(false)
        setSubjectEnhanceSelection(0)
        setScreen('subject-enhance')
      }}
    /></MobileFrame>
  }

  if (screen === 'subject-enhance') {
    return <MobileFrame><SubjectEnhancePage
      imageSrc={createSubjectImage}
      selectedIndex={subjectEnhanceSelection}
      onBack={() => setScreen('create-subject')}
      onSelect={setSubjectEnhanceSelection}
    /></MobileFrame>
  }

  if (screen === 'subject-preview') {
    return <MobileFrame><SubjectPreviewPage
      subject={selectedSubject}
      isDeleteDialogOpen={isSubjectDeleteDialogOpen}
      onBack={() => {
        setIsSubjectDeleteDialogOpen(false)
        setScreen('home')
      }}
      onDelete={() => setIsSubjectDeleteDialogOpen(true)}
      onCancelDelete={() => setIsSubjectDeleteDialogOpen(false)}
      onConfirmDelete={() => {
        setIsSubjectDeleteDialogOpen(false)
        setSelectedSubject(null)
        setScreen('home')
      }}
    /></MobileFrame>
  }

  if (screen === 'agent-page') {
    return <MobileFrame><AgentPage onBack={() => setScreen('home')} /></MobileFrame>
  }

  if (screen === 'product-link') {
    return <MobileFrame><ProductLinkPage
      mode={productLinkMode}
      productImage={businessPosterImage}
      modelImage={heroImages[0]}
      sampleFilled={productLinkSampleFilled}
      onBack={() => {
        setProductLinkMode('link')
        setProductLinkSampleFilled(false)
        setScreen('home')
      }}
      onSkip={() => setProductLinkMode('manual')}
      onSwitchToLink={() => setProductLinkMode('link')}
      onFillSample={() => setProductLinkSampleFilled(true)}
      onClearSample={() => setProductLinkSampleFilled(false)}
      onSubmit={() => setScreen('product-copy-loading')}
    /></MobileFrame>
  }

  if (screen === 'product-copy-loading') {
    return <MobileFrame><ProductCopyLoadingPage
      productImage={businessPosterImage}
      onClose={() => {
        setProductLinkMode('link')
        setProductLinkSampleFilled(false)
        setScreen('home')
      }}
      onDone={() => setScreen('product-copy-preview')}
    /></MobileFrame>
  }

  if (screen === 'product-copy-preview') {
    return <MobileFrame><ProductCopyPreviewPage
      productImage={businessPosterImage}
      modelImage={heroImages[0]}
      onBack={() => setScreen('product-link')}
      onSubmit={() => setScreen('generation-submitted')}
    /></MobileFrame>
  }

  if (screen === 'generation-submitted') {
    return <MobileFrame><GenerationSubmittedPage
      onClose={() => {
        setProductLinkMode('link')
        setProductLinkSampleFilled(false)
        setScreen('home')
      }}
      onAgain={() => {
        setProductLinkMode('link')
        setProductLinkSampleFilled(false)
        setScreen('product-link')
      }}
    /></MobileFrame>
  }

  if (screen === 'ecommerce-elements') {
    return <MobileFrame><EcommerceElementsPage
      previewImage={ecommerceElementsImage}
      faceImage={ecommerceFaceImage}
      sceneImage={ecommerceSceneImage}
      replaceSheet={ecommerceReplaceSheet}
      selectedRatio={ecommerceRatio}
      isRatioMenuOpen={ecommerceRatioMenuOpen}
      onBack={() => setScreen('home')}
      onOpenObjectPicker={() => {
        setPickerTarget('image')
        setPickerReturnScreen('ecommerce-elements')
        setPickerReplaceTarget(null)
        setPickerMode('all')
        setPickerLibrary('album')
        setPickerSelection([])
        setEcommerceReplaceSheet(null)
        setEcommerceRatioMenuOpen(false)
        setScreen('picker')
      }}
      onOpenFaceSheet={() => {
        setEcommerceRatioMenuOpen(false)
        setEcommerceReplaceSheet('face')
      }}
      onOpenSceneSheet={() => {
        setEcommerceRatioMenuOpen(false)
        setEcommerceReplaceSheet('scene')
      }}
      onCloseReplaceSheet={() => setEcommerceReplaceSheet(null)}
      onSelectFacePreset={(image) => {
        setEcommerceFaceImage(image)
        setEcommerceReplaceSheet(null)
      }}
      onSelectScenePreset={(image) => {
        setEcommerceSceneImage(image)
        setEcommerceReplaceSheet(null)
      }}
      onOpenReplacePhotoPicker={() => {
        setPickerTarget('image')
        setPickerReturnScreen('ecommerce-elements')
        setPickerReplaceTarget(null)
        setPickerMode('all')
        setPickerLibrary('album')
        setPickerSelection([])
        setEcommerceRatioMenuOpen(false)
        setScreen('picker')
      }}
      onToggleRatioMenu={() => setEcommerceRatioMenuOpen((current) => !current)}
      onSelectRatio={(ratio) => {
        setEcommerceRatio(ratio)
        setEcommerceRatioMenuOpen(false)
      }}
      onGenerate={() => setScreen('generation-submitted')}
    /></MobileFrame>
  }

  if (screen === 'detail') {
    return <MobileFrame><>
      <AgentDetailPage
        detail={detail}
        onBack={() => {
          setIsPosterUploadSheetOpen(false)
          setPosterUploadContext(null)
          setScreen('home')
        }}
        onOpenPicker={(index) => {
          setPickerTarget(detail?.type === 'image' ? 'image' : 'video')
          setPickerReturnScreen('detail')
          setPickerReplaceTarget(index)
          setPickerMode('all')
          setPickerLibrary('album')
          setPickerSelection([])
          setScreen('picker')
        }}
        onCreate={(promptData, type) => {
          if (type === 'poster-upload-sheet') {
            setPosterUploadContext({ promptData, type })
            setIsPosterUploadSheetOpen(true)
            return
          }

          if (type === 'agent-page') {
            setScreen('agent-page')
            return
          }

          if (type === 'image') {
            setImagePrompt(promptData)
            setScreen('image')
            return
          }

          setVideoPrompt(promptData)
          setScreen('video')
        }}
      />
      {isPosterUploadSheetOpen && (
        <PosterUploadSheet
          onClose={() => {
            setIsPosterUploadSheetOpen(false)
            setPosterUploadContext(null)
          }}
          onFromCamera={() => {
            setIsPosterUploadSheetOpen(false)
            setPosterUploadContext(null)
          }}
          onFromPhoto={() => {
            setIsPosterUploadSheetOpen(false)
            setPosterUploadContext(null)
            setPickerTarget('image')
            setPickerReturnScreen(detail?.title === '电商宣传图' ? 'ecommerce-elements' : 'home')
            setPickerReplaceTarget(null)
            setPickerMode('all')
            setPickerLibrary('album')
            setPickerSelection([])
            setScreen('picker')
          }}
        />
      )}
    </></MobileFrame>
  }

  return (
    <MobileFrame>
      <main className={`phone-shell${isBusinessTab ? ' phone-shell-agent' : ''}${activeTab === '我的' ? ' phone-shell-mine' : ''}`}>
      {isBusinessTab ? (
        <section
          className={`business-hero-shell${businessHeroExpanded ? ' expanded' : ' collapsed'}`}
          style={{ '--business-hero-offset': `${businessHeroOffset}px` }}
        >
          <div className="business-hero-panel">
            <AgentHeroCarousel
              videos={agentCarouselVideos}
              onSelectVideo={(video) => {
                setDetail({ src: video.src, poster: video.poster, type: 'video', title: '宣传视频', subtitle: '产品卖点展示', caption: '一键生成产品宣传视频', refs: video.refs, prompt: video.prompt })
                setScreen('detail')
              }}
            />
            <div className="business-hero-overlay">
              <span>Seedance 2.0</span>
              <Icon type="arrowRight" />
            </div>
          </div>

          <section
            className={`quick-actions${isBusinessTab ? ' quick-actions-scroll' : ''}`}
            onPointerDown={handleBusinessQuickActionsPointerDown}
            onPointerMove={handleBusinessQuickActionsPointerMove}
            onPointerUp={handleBusinessQuickActionsPointerUp}
            onPointerCancel={resetBusinessGesture}
          >
            {quickActionItems.map((item) => (
              <button
                className="quick-item"
                key={item.label}
                onClick={() => {
                  if (item.label === 'Assets') setScreen('agent-page')
                  if (item.label === 'AI视频') setScreen('video')
                  if (item.label === 'AI图片') setScreen('image')
                }}
              >
                <span className="quick-icon">
                  {item.badge && <span className="model-badge">{item.badge}</span>}
                  <Icon type={item.icon} />
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </section>
        </section>
      ) : activeTab === '我的' ? (
        <MinePage category={mineCategory} onCategoryChange={setMineCategory} />
      ) : (
        <>
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
                  {item.badge && <span className="model-badge">{item.badge}</span>}
                  <Icon type={item.icon} />
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </section>
        </>
      )}

      {activeTab !== '我的' && (
        <TemplateSection title={content.firstTitle} subtitle={content.firstSubtitle} layout="row">
          {firstImages.map((item, index) => (
            <ImageCard
              key={`${activeTab}-${item.src}`}
              src={item.src}
              className={index === 3 ? 'peek' : ''}
              onClick={isBusinessTab ? () => {
                setDetail({
                  ...item.detailMedia,
                  title: '产品海报',
                  subtitle: '高级商品展示',
                  caption: '一键生成产品大片',
                  refs: businessImagePrompts.poster.refs,
                  prompt: businessImagePrompts.poster.prompt,
                })
                setScreen('detail')
              } : undefined}
            />
          ))}
        </TemplateSection>
      )}

      {activeTab !== '我的' && (
        <TemplateSection title={content.secondTitle} subtitle={content.secondSubtitle} layout="popular">
          {secondImages.map((item, index) => (
            <ImageCard
              key={`${activeTab}-${item.src}`}
              src={item.src}
              onClick={isBusinessTab ? () => {
                if (index === 0) {
                  setDetail({
                    ...item.detailMedia,
                    title: '电商宣传图',
                    subtitle: '高级商品展示',
                    caption: '一键生成产品大片',
                    refs: businessImagePrompts.ecommerce.refs,
                    prompt: businessImagePrompts.ecommerce.prompt,
                  })
                  setScreen('detail')
                  return
                }

                setImagePrompt({
                  refs: businessImagePrompts.ecommerce.refs,
                  prompt: businessImagePrompts.ecommerce.prompt,
                })
                setScreen('image')
              } : undefined}
            />
          ))}
        </TemplateSection>
      )}

      {isBusinessTab && (
        <TemplateSection title="宣传视频" subtitle="适合产品卖点展示和社媒投放。" layout="video">
          {promoVideos.map((video) => (
            <VideoCard
              key={`${video.src}-${video.poster}`}
              video={video}
              onClick={() => {
                setVideoPrompt({ refs: video.refs, prompt: video.prompt })
                setScreen('video')
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
    </MobileFrame>
  )
}

function MinePage({ category, onCategoryChange }) {
  return (
    <>
      <div className="status-bar mine-status-bar">
        <span>14:46</span>
        <div className="system-icons">
          <span className="signal">••••</span>
          <span className="wifi">⌁</span>
          <span className="battery">68</span>
        </div>
      </div>

      <section className="mine-top-panel">
        <TokenPill />
        <div className="mine-top-actions">
          <button className="mine-circle-button" type="button"><Icon type="layers" /></button>
          <button className="mine-circle-button" type="button"><Icon type="settings" /></button>
        </div>
      </section>

      <div className="mine-category-tabs">
        <button className={category === '历史创作' ? 'selected' : ''} onClick={() => onCategoryChange('历史创作')} type="button">
          历史创作
        </button>
      </div>

      <section className="mine-gallery">
        {mineGalleryImages.map((src, index) => (
          <button className="mine-gallery-card" key={`${category}-${src}-${index}`} type="button">
            <img src={src} alt={category} />
            {index === 1 && <span className="mine-gallery-badge">New</span>}
            <span className={`mine-gallery-mark${index % 2 === 0 ? ' video' : ''}`}><Icon type={index % 2 === 0 ? 'image' : 'video'} /></span>
          </button>
        ))}
      </section>

      <p className="mine-expire-copy">作品72小时内有效，请及时保存。</p>
      <div className="mine-bottom-spacer" />
    </>
  )
}

function SubjectPreviewPage({ subject, isDeleteDialogOpen, onBack, onDelete, onCancelDelete, onConfirmDelete }) {
  const item = subject ?? {
    name: '主体1',
    tag: '人像',
    images: ['/vedios/耳机.jpg', '/vedios/背景.jpg', '/vedios/手机.jpg'],
  }

  return (
    <main className="subject-preview-screen">
      <div className="status-bar subject-preview-status">
        <span>17:13</span>
        <div className="system-icons">
          <span className="signal">••••</span>
          <span className="wifi">⌁</span>
          <span className="battery">95</span>
        </div>
      </div>

      <header className="subject-preview-header">
        <button className="subject-preview-icon-button" onClick={onBack} aria-label="返回">
          <Icon type="back" />
        </button>
        <div className="subject-preview-actions">
          <button className="subject-preview-icon-button" aria-label="收藏">
            <Icon type="star" />
          </button>
          <button className="subject-preview-icon-button" aria-label="删除" onClick={onDelete}>
            <Icon type="trash" />
          </button>
        </div>
      </header>

      <section className="subject-preview-body">
        <div className="subject-preview-gallery">
          {item.images.map((src, index) => (
            <div className="subject-preview-slide" key={`${src}-${index}`}>
              <img src={src} alt={item.name} />
            </div>
          ))}
        </div>

        <div className="subject-preview-info">
          <h1>{item.name}</h1>
          <span>{item.tag}</span>
        </div>
      </section>

      {isDeleteDialogOpen && (
        <div className="subject-preview-dialog-backdrop">
          <div className="subject-preview-dialog" role="dialog" aria-modal="true" aria-label="删除主体确认">
            <p>确定删除该主体吗？</p>
            <div className="subject-preview-dialog-actions">
              <button className="subject-preview-dialog-secondary" onClick={onCancelDelete} type="button">取消</button>
              <button className="subject-preview-dialog-primary" onClick={onConfirmDelete} type="button">确定</button>
            </div>
          </div>
        </div>
      )}

      <div className="picker-home-indicator"></div>
    </main>
  )
}

function AgentPage({ onBack }) {
  return (
    <main className="agent-page-screen">
      <div className="status-bar agent-page-status">
        <span>16:55</span>
        <div className="system-icons">
          <span className="signal">••••</span>
          <span className="wifi">⌁</span>
          <span className="battery">59</span>
        </div>
      </div>

      <header className="agent-page-header">
        <button className="agent-page-round-button" onClick={onBack} aria-label="返回">
          <Icon type="back" />
        </button>
        <div className="agent-page-title-wrap">
          <span className="agent-page-sparkle sparkle-left">✦</span>
          <h1 className="agent-page-title">Agent</h1>
          <span className="agent-page-sparkle sparkle-right">✦</span>
          <span className="agent-page-sparkle sparkle-top">✦</span>
          <span className="agent-page-sparkle sparkle-small">✦</span>
        </div>
        <button className="agent-page-filter" aria-label="筛选">
          <Icon type="filter" />
        </button>
      </header>

      <section className="agent-page-body">
        <h2 className="agent-page-date">Apr 27</h2>
        <p className="agent-page-message">模仿@video1将@image1里的⼈物替换进去</p>

        <div className="agent-page-meta-row">
          <span className="agent-page-meta-pill icon-pill"><Icon type="agentVideo" /></span>
          <span className="agent-page-meta-pill">480P</span>
          <span className="agent-page-meta-pill">Seedance2.0 PRO</span>
        </div>

        <div className="agent-page-preview-card">
          <img src={mineGalleryImages[0]} alt="Agent 参考图" />
        </div>

        <div className="agent-page-divider"></div>
      </section>

      <div className="agent-page-composer-wrap">
        <div className="agent-page-composer">
          <div className="agent-page-composer-icon">
            <Icon type="agentVideo" />
            <Icon type="swap" />
          </div>
          <span className="agent-page-composer-placeholder">描述视频内容</span>
          <button className="agent-page-send" type="button" aria-label="发送">
            <Icon type="arrowRight" />
          </button>
        </div>
      </div>
    </main>
  )
}

function ProductLinkPage({ mode, productImage, modelImage, sampleFilled, onBack, onSkip, onSwitchToLink, onFillSample, onClearSample, onSubmit }) {
  const isManual = mode === 'manual'

  return (
    <main className="product-link-screen">
      <div className="status-bar product-link-status">
        <span>17:18</span>
        <div className="system-icons">
          <span className="signal">••••</span>
          <span className="wifi">⌁</span>
          <span className="battery">86</span>
        </div>
      </div>

      <header className="product-link-header">
        <button className="product-link-back" onClick={onBack} aria-label="返回">
          <Icon type="back" />
        </button>
        <h1>模板标题</h1>
        <span className="product-link-header-spacer"></span>
      </header>

      <section className="product-link-body">
        <div className="product-link-media-row">
          <div className="product-link-media-card product-link-media-product">
            <img src={productImage} alt="产品图片" />
            <span>产品图</span>
          </div>
          <div className="product-link-media-card product-link-media-model">
            <img src={modelImage} alt="模特图片" />
            <span>模特图</span>
          </div>
        </div>

        <section className="product-link-panel">
          {isManual ? (
            <>
              <div className="product-link-copy">
                <strong>补充产品卖点</strong>
                <p>没有上传链接，直接补充产品的核心卖点和使用场景等</p>
              </div>
              <div className="product-link-textarea">
                防晒透气、轻量包裹、适合日常通勤与运动穿搭，突出高级质感和上脚舒适感
              </div>
              <button className="product-link-secondary" onClick={onSwitchToLink} type="button">返回上传产品链接</button>
              <button className="product-link-submit" onClick={onSubmit} type="button">继续生成</button>
            </>
          ) : (
            <>
              <div className="product-link-link-tab">
                <div className="product-link-link-copy">
                  <strong>Share your product link<br />to generate a script</strong>
                  <p>Supports:</p>
                </div>

                <div className="product-link-platform-row">
                  {[
                    { label: 'amazon', short: 'a', tone: 'amazon' },
                    { label: 'ebay', short: 'eb', tone: 'ebay' },
                    { label: 'tiktok', short: '♪', tone: 'tiktok' },
                    { label: 'walmart', short: '✳', tone: 'walmart' },
                    { label: 'appstore', short: 'A', tone: 'appstore' },
                    { label: 'googleplay', short: '▶', tone: 'googleplay' },
                    { label: 'more', short: '…', tone: 'more' },
                  ].map((item) => (
                    <span className={`product-link-platform-pill product-link-platform-pill-${item.tone}`} key={item.label}>{item.short}</span>
                  ))}
                </div>

                <div className="product-link-input-shell is-static">
                  <div className="product-link-input-field">
                    <span className="product-link-input-icon">🔗</span>
                    <span className={`product-link-input-placeholder${sampleFilled ? ' is-filled' : ''}`}>
                      {sampleFilled ? 'https://www.amazon.com/dp/B0CGX9ZX1X' : 'www.product.page'}
                    </span>
                  </div>
                  {sampleFilled && (
                    <button className="product-link-input-clear" onClick={onClearSample} type="button" aria-label="清空链接">✕</button>
                  )}
                </div>

                <p className="product-link-link-hint">*Provide url for the same product just uploaded.</p>
              </div>

              <button className="product-link-submit" onClick={onSubmit} type="button">继续生成</button>
              <button className="product-link-skip" onClick={onSkip} type="button">跳过，手动补充产品卖点</button>
            </>
          )}
        </section>
      </section>
    </main>
  )
}

function ProductCopyLoadingPage({ productImage, onClose, onDone }) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onDone()
    }, 1400)

    return () => window.clearTimeout(timer)
  }, [onDone])

  return (
    <main className="product-copy-loading-screen">
      <div className="status-bar product-copy-loading-status">
        <span>10:29</span>
        <div className="system-icons">
          <span className="signal">••••</span>
          <span className="wifi">⌁</span>
          <span className="battery">67</span>
        </div>
      </div>

      <header className="product-copy-loading-header">
        <button className="product-copy-loading-close" onClick={onClose} aria-label="关闭">
          <Icon type="close" />
        </button>
      </header>

      <section className="product-copy-loading-body">
        <div className="product-copy-loading-preview">
          <img src={productImage} alt="文案生成预览" />
          <div className="product-copy-loading-overlay"></div>
          <span className="product-copy-loading-spark product-copy-loading-spark-one">✦</span>
          <span className="product-copy-loading-spark product-copy-loading-spark-two">✦</span>
          <span className="product-copy-loading-spark product-copy-loading-spark-three">✦</span>
          <strong>Guma</strong>
        </div>

        <div className="product-copy-loading-progress">
          <div className="product-copy-loading-progress-fill"></div>
        </div>

        <div className="product-copy-loading-copy">
          <h1>文案生成中</h1>
          <p>正在根据您的商品信息生成推荐文案，请稍候...</p>
        </div>
      </section>
    </main>
  )
}

function ProductCopyPreviewPage({ productImage, modelImage, onBack, onSubmit }) {
  return (
    <main className="product-link-screen">
      <div className="status-bar product-link-status">
        <span>17:18</span>
        <div className="system-icons">
          <span className="signal">••••</span>
          <span className="wifi">⌁</span>
          <span className="battery">86</span>
        </div>
      </div>

      <header className="product-link-header product-copy-preview-header">
        <button className="product-link-back" onClick={onBack} aria-label="返回">
          <Icon type="back" />
        </button>
        <h1>文案预览</h1>
        <TokenPill compact />
      </header>

      <section className="product-link-body">
        <div className="product-link-media-row">
          <div className="product-link-media-card product-link-media-product">
            <img src={productImage} alt="产品图片" />
            <span>产品图</span>
          </div>
          <div className="product-link-media-card product-link-media-model">
            <img src={modelImage} alt="模特图片" />
            <span>模特图</span>
          </div>
        </div>

        <section className="product-link-panel product-copy-preview-panel">
          <div className="product-copy-preview-card">
            <p>
              轻量包裹与透气鞋面结合，突出日常通勤与运动场景的舒适体验；以高级简洁的视觉风格展示产品质感，强化上脚轻盈、百搭耐看的核心卖点。
            </p>
          </div>

          <div className="product-copy-preview-actions">
            <button className="product-copy-preview-redo" type="button" aria-label="重做">
              <Icon type="reset" />
              <span className="product-copy-preview-redo-cost"><span>✦</span>10</span>
            </button>
            <button className="product-copy-preview-submit" onClick={onSubmit} type="button">
              <span className="product-copy-preview-submit-cost"><span>✦</span>100</span>
              继续生成
            </button>
          </div>
        </section>
      </section>
    </main>
  )
}

function EcommerceReplaceSheet({ type, presets, onClose, onFromCamera, onFromPhoto, onSelectPreset }) {
  const isFace = type === 'face'

  return (
    <div className="ecommerce-replace-backdrop">
      <div className="ecommerce-replace-sheet" role="dialog" aria-modal="true" aria-label={isFace ? '替换人物元素' : '替换场景元素'}>
        <div className="ecommerce-replace-handle"></div>

        <header className="ecommerce-replace-header">
          <button className="ecommerce-replace-back" onClick={onClose} type="button" aria-label="返回">
            <Icon type="back" />
          </button>
          <h2>{isFace ? '替换人物元素' : '替换场景元素'}</h2>
          <span className="ecommerce-replace-header-spacer"></span>
        </header>

        <div className="ecommerce-replace-actions">
          <button className="ecommerce-replace-action" onClick={onFromCamera} type="button">
            <Icon type="camera" />
            <span>拍照导入</span>
          </button>
          <button className="ecommerce-replace-action" onClick={onFromPhoto} type="button">
            <Icon type="image" />
            <span>相册导入</span>
          </button>
        </div>

        <div className="ecommerce-replace-title">预设图片</div>

        <div className="ecommerce-replace-grid">
          {presets.map((item) => (
            <button className="ecommerce-replace-card" key={item.label} onClick={() => onSelectPreset(item.src)} type="button">
              <img src={item.src} alt={item.label} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function EcommerceElementsPage({ previewImage, faceImage, sceneImage, replaceSheet, selectedRatio, isRatioMenuOpen, onBack, onGenerate, onOpenObjectPicker, onOpenFaceSheet, onOpenSceneSheet, onCloseReplaceSheet, onSelectFacePreset, onSelectScenePreset, onOpenReplacePhotoPicker, onToggleRatioMenu, onSelectRatio }) {
  const replacePresets = replaceSheet === 'face' ? ecommerceFacePresets : ecommerceScenePresets

  return (
    <main className={`ecommerce-elements-screen${replaceSheet ? ' has-replace-sheet' : ''}`}>
      <div className="status-bar ecommerce-elements-status">
        <span>10:53</span>
        <div className="system-icons">
          <span className="signal">••••</span>
          <span className="wifi">⌁</span>
          <span className="battery">61</span>
        </div>
      </div>

      <header className="ecommerce-elements-header ecommerce-elements-header-with-token">
        <button className="ecommerce-elements-back" onClick={onBack} aria-label="返回">
          <Icon type="back" />
        </button>
        <h1>耳机展示</h1>
        <TokenPill compact />
      </header>

      <section className="ecommerce-elements-body">
        <div className="ecommerce-elements-preview">
          <img src={previewImage} alt="Fashion UGC preview" />
        </div>

        <section className="ecommerce-elements-panel">
          <div className="ecommerce-elements-panel-head">
            <strong>选择元素</strong>
            <div className="ecommerce-elements-ratio-wrap">
              <button className="ecommerce-elements-ratio-pill" onClick={onToggleRatioMenu} type="button">
                <span className="ecommerce-elements-ratio-icon"></span>{selectedRatio}
              </button>
              {isRatioMenuOpen && (
                <div className="ecommerce-elements-ratio-menu">
                  {ecommerceRatioOptions.map((ratio) => (
                    <button
                      className={`ecommerce-elements-ratio-option${ratio === selectedRatio ? ' is-active' : ''}`}
                      key={ratio}
                      onClick={() => onSelectRatio(ratio)}
                      type="button"
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="ecommerce-elements-divider"></div>

          <div className="ecommerce-elements-subtitle">元素列表</div>

          <div className="ecommerce-elements-list">
            {[
              { src: previewImage, label: '商品主体', large: true, onClick: onOpenObjectPicker },
              { src: faceImage, label: '人物元素', onClick: onOpenFaceSheet },
              { src: sceneImage, label: '场景元素', onClick: onOpenSceneSheet },
            ].map((item) => (
              <div className={`ecommerce-elements-card${item.large ? ' is-large' : ''}`} key={item.label}>
                <button className="ecommerce-elements-thumb-wrap" onClick={item.onClick} type="button">
                  <img src={item.src} alt={item.label} />
                  <span className="ecommerce-elements-count">1L</span>
                </button>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <button className="ecommerce-elements-generate" onClick={onGenerate} type="button">
          <span className="ecommerce-elements-generate-cost"><span>✦</span>100</span>
          一键制作
        </button>
      </section>

      {replaceSheet && (
        <EcommerceReplaceSheet
          type={replaceSheet}
          presets={replacePresets}
          onClose={onCloseReplaceSheet}
          onFromCamera={() => {}}
          onFromPhoto={onOpenReplacePhotoPicker}
          onSelectPreset={replaceSheet === 'face' ? onSelectFacePreset : onSelectScenePreset}
        />
      )}
    </main>
  )
}

function GenerationSubmittedPage({ onClose, onAgain }) {
  return (
    <main className="generation-submitted-screen">
      <div className="status-bar generation-submitted-status">
        <span>10:29</span>
        <div className="system-icons">
          <span className="signal">••••</span>
          <span className="wifi">⌁</span>
          <span className="battery">67</span>
        </div>
      </div>

      <header className="generation-submitted-header">
        <button className="generation-submitted-close" onClick={onClose} aria-label="关闭">
          <Icon type="close" />
        </button>
      </header>

      <section className="generation-submitted-body">
        <div className="generation-submitted-preview">
          <img src={heroImages[0]} alt="Guma 提交成功" />
          <div className="generation-submitted-preview-overlay"></div>
          <span className="generation-submitted-spark generation-submitted-spark-one">✦</span>
          <span className="generation-submitted-spark generation-submitted-spark-two">✦</span>
          <span className="generation-submitted-spark generation-submitted-spark-three">✦</span>
          <strong>Guma</strong>
        </div>

        <div className="generation-submitted-progress">
          <div className="generation-submitted-progress-fill"></div>
        </div>

        <div className="generation-submitted-copy">
          <h1>提交成功</h1>
          <p>预计时间 <span>1 分钟</span></p>
          <p>查看进度在 <em>【我的】</em></p>
          <p>您可以离开此页面等待.</p>
        </div>
      </section>

      <footer className="generation-submitted-footer">
        <button className="generation-submitted-again" onClick={onAgain} type="button">再做一个</button>
        <button className="generation-submitted-home" type="button" aria-label="我的">
          <Icon type="home" />
        </button>
      </footer>
    </main>
  )
}

function PosterUploadSheet({ onClose, onFromCamera, onFromPhoto }) {  return (
    <div className="poster-upload-sheet-backdrop">
      <div className="poster-upload-sheet" role="dialog" aria-modal="true" aria-label="上传建议">
        <div className="poster-upload-sheet-handle"></div>
        <header className="poster-upload-sheet-header">
          <h2>Upload suggestions</h2>
          <button className="poster-upload-sheet-close" onClick={onClose} type="button" aria-label="关闭">
            <Icon type="close" />
          </button>
        </header>

        <section className="poster-upload-sheet-section">
          <div className="poster-upload-sheet-title good">
            <span>✓</span>
            <strong>Good photo example</strong>
          </div>
          <div className="poster-upload-sheet-good-card">
            <div className="poster-upload-sheet-good-image">
              <img src={productPosterImages[1]} alt="Good photo example" />
            </div>
            <div className="poster-upload-sheet-good-points">
              <p>✓ Single product</p>
              <p>✓ Clean background</p>
              <p>✓ Full product shot</p>
            </div>
          </div>
        </section>

        <section className="poster-upload-sheet-section bad-section">
          <div className="poster-upload-sheet-title bad">
            <span>✕</span>
            <strong>Bad photo examples</strong>
          </div>
          <div className="poster-upload-sheet-bad-grid">
            {[
              { src: ecommercePromoImages[0], label: 'Mutiple items' },
              { src: heroImages[0], label: 'With model' },
              { src: productPosterImages[3], label: 'Incomplete' },
            ].map((item) => (
              <div className="poster-upload-sheet-bad-card" key={item.label}>
                <img src={item.src} alt={item.label} />
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="poster-upload-sheet-actions">
          <button className="poster-upload-sheet-action" onClick={onFromCamera} type="button">
            <Icon type="camera" />
            <span>拍照导入</span>
          </button>
          <button className="poster-upload-sheet-action" onClick={onFromPhoto} type="button">
            <Icon type="image" />
            <span>相册导入</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function AgentHeroCarousel({ videos, onSelectVideo }) {
  return (
    <section className="agent-hero-carousel">
      <div className="agent-hero-track">
        {videos.map((video, index) => (
          <button className="agent-hero-slide" key={`${video.src}-${index}`} onClick={() => onSelectVideo(video)}>
            <video autoPlay className="agent-hero-video" loop muted playsInline poster={video.poster} src={video.src} />
          </button>
        ))}
      </div>
    </section>
  )
}

function MobileFrame({ children }) {
  return (
    <div className="mobile-viewport">
      <div className="mobile-canvas">{children}</div>
    </div>
  )
}

function repeatImages(images, targetCount) {
  if (images.length === 0) return []

  return Array.from({ length: targetCount }, (_, index) => images[index % images.length])
}

function useMobileScale() {
  useEffect(() => {
    const updateScale = () => {
      const scale = Math.min(window.innerWidth / 390, window.innerHeight / 844)
      document.documentElement.style.setProperty('--mobile-scale', Math.min(scale, 1).toString())
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])
}

function useResetViewportScroll(screen, activeTab) {
  useEffect(() => {
    const viewport = document.querySelector('.mobile-viewport')
    const shell = document.querySelector('.phone-shell')
    if (viewport) viewport.scrollTop = 0
    if (shell) shell.scrollTop = 0
    window.scrollTo(0, 0)
  }, [screen, activeTab])
}

function AgentDetailPage({ detail, onBack, onOpenPicker, onCreate }) {
  const item = detail ?? {
    src: productPosterImages[0],
    title: '产品海报',
    subtitle: '高级商品展示',
    caption: '一键生成产品大片',
  }
  const battlePromptCopy = item.prompt ?? '上传两张人物照@图片1，@图片2和一张场景照@图片3，生成人物打斗视频'

  if (item.useBattleLayout) {
    return (
      <main className="battle-detail-screen">
        <div className="status-bar battle-detail-status">
          <span>16:32</span>
          <div className="system-icons">
            <span className="signal">••••</span>
            <span className="wifi">⌁</span>
            <span className="battery">32</span>
          </div>
        </div>

        <header className="battle-detail-header">
          <button className="battle-detail-back" onClick={onBack} aria-label="返回">
            <Icon type="back" />
          </button>
          <h1>{item.title}</h1>
          <TokenPill compact />
        </header>

        <section className="battle-detail-body">
          <p>
            {battlePromptCopy.split(/(@[^，。\s]+)/g).map((part, index) => (
              part.startsWith('@') ? <span key={`${part}-${index}`}>{part}</span> : part
            ))}
          </p>

          <div className="battle-detail-grid">
            {item.refs?.slice(0, 3).map((ref, index) => (
              <button className="battle-detail-card" key={`${ref.label}-${index}`} onClick={() => onOpenPicker?.(index)} type="button">
                <div className="battle-detail-card-icon"><Icon type="imagePlus" /></div>
                <strong>{`image${index + 1}`}</strong>
              </button>
            ))}
          </div>
        </section>

        <div className="battle-detail-footer">
          <button className="battle-detail-create" onClick={() => onCreate?.({ refs: item.refs, prompt: item.prompt }, item.type === 'poster-upload' ? 'poster-upload-sheet' : 'agent-page')} type="button">
            <span className="battle-detail-price"><span className="battle-detail-price-icon">✦</span><strong>350</strong><s>700</s></span>
            <i></i>
            <span>一键制作</span>
          </button>
          <p>只有在创建成功后才会扣除金币。</p>
        </div>
      </main>
    )
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
          onClick={() => onCreate?.({ refs: item.refs, prompt: item.prompt }, 'poster-upload-sheet')}
        >
          一键制作
        </button>
      </section>
    </main>
  )
}

function AiImagePage({ onBack, promptData, onOpenPicker, onReplaceRef, onRemoveRef, onCreate }) {
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
        <div className="video-header-token-wrap">
          <TokenPill compact />
        </div>
      </header>

      <section className="image-hero">
        <span className="star star-one">✦</span>
        <span className="star star-two">✦</span>
        <span className="star star-three">✦</span>
        <span className="star star-four">✦</span>

        {promptData ? (
          <ImagePromptBox
            refs={promptData.refs}
            prompt={promptData.prompt}
            onAdd={onOpenPicker}
            onRemove={onRemoveRef}
            onReplace={onReplaceRef}
          />
        ) : (
          <>
            <button className="image-upload-card" aria-label="上传参考图">
              <span>+</span>
              <strong>参考图</strong>
            </button>

            <div className="image-prompt">请描述图片场景，例如：生成一张活动海报 <button><Icon type="idea" /></button></div>
          </>
        )}
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
        <button className="create-button" onClick={onCreate} type="button">一键制作</button>
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

function AiVideoPage({ onBack, promptData, onOpenPicker, onReplaceRef, onRemoveRef }) {
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
        <div className="video-header-token-wrap">
          <TokenPill compact />
        </div>
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
          <VideoPromptBox
            refs={promptData.refs}
            prompt={promptData.prompt}
            onAdd={onOpenPicker}
            onRemove={onRemoveRef}
            onReplace={onReplaceRef}
          />
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

function ImagePromptBox({ refs = [], prompt, onAdd, onReplace, onRemove }) {
  return (
    <div className="video-prompt-box image-prompt-box">
      <div className="ref-strip">
        {refs.map((ref, index) => (
          <div className="ref-card" key={ref.label}>
            <img src={ref.image} alt={ref.label} />
            <button className="ref-card-remove" onClick={() => onRemove?.(index)} type="button">×</button>
            <button aria-label="替换" className="ref-card-replace" onClick={() => onReplace?.(index)} type="button"><Icon type="replace" /></button>
            <span>@{ref.label}</span>
          </div>
        ))}
        <button className="ref-add" onClick={onAdd} type="button">+
          <span>添加</span>
        </button>
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

function VideoPromptBox({ refs = [], prompt, onAdd, onReplace, onRemove }) {
  return (
    <div className="video-prompt-box">
      <div className="ref-strip">
        {refs.map((ref, index) => (
          <div className="ref-card" key={ref.label}>
            <img src={ref.image} alt={ref.label} />
            <button className="ref-card-remove" onClick={() => onRemove?.(index)} type="button">×</button>
            <button aria-label="替换" className="ref-card-replace" onClick={() => onReplace?.(index)} type="button"><Icon type="replace" /></button>
            <span>@{ref.label}</span>
          </div>
        ))}
        <button className="ref-add" onClick={onAdd} type="button">+
          <span>添加</span>
        </button>
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

function ReferencePickerPage({
  library,
  mode = 'all',
  subjectCategory,
  selectedImages,
  onBack,
  onToggleImage,
  onNext,
}) {
  const isAlbumOnly = true
  const gridImages = pickerAlbumImages

  return (
    <main className="picker-screen">
      <div className="status-bar video-status picker-status">
        <span>17:13</span>
        <div className="system-icons">
          <span className="signal">••••</span>
          <span className="wifi">⌁</span>
          <span className="battery">95</span>
        </div>
      </div>

      <header className="picker-header picker-header-centered picker-header-album-only">
        <button className="picker-close picker-close-round" onClick={onBack} aria-label="返回">
          <Icon type="back" />
        </button>
        <h1>相册选择</h1>
        <button className="picker-next" onClick={onNext} type="button">Next</button>
      </header>

      <section className="picker-section">
        <h2>历史</h2>
        <div className="picker-history-row">
          {pickerHistoryImages.map((src, index) => {
            const selected = selectedImages.includes(src)

            return (
              <button className="picker-history-card" key={`history-${src}-${index}`} onClick={() => onToggleImage(src)} type="button">
                <img src={src} alt="历史素材" />
                <span className={`picker-check${selected ? ' selected' : ''}`}></span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="picker-section picker-latest-section">
        <h2>相册中的最新照片</h2>
        <div className="picker-grid">
          {gridImages.map((src, index) => {
            const selected = selectedImages.includes(src)

            return (
              <button className="picker-cell" key={`${library}-${src}-${index}`} onClick={() => onToggleImage(src)} type="button">
                <img src={src} alt="相册素材" />
                <span className={`picker-check${selected ? ' selected' : ''}`}></span>
              </button>
            )
          })}
        </div>
      </section>

      <div className="picker-home-indicator"></div>
    </main>
  )
}

function CreateSubjectPage({ tag, imageSrc, extraImages = [], isTagMenuOpen, onBack, onToggleTagMenu, onSelectTag, onOpenAlbumPicker, onOpenExtraPicker, onDeletePrimary, onDeleteExtra, onOpenSmartFill }) {
  const mergedImages = [imageSrc, ...extraImages]
  const useGalleryLayout = mergedImages.length >= 2

  return (
    <main className="create-subject-screen">
      <div className="status-bar video-status picker-status">
        <span>17:13</span>
        <div className="system-icons">
          <span className="signal">••••</span>
          <span className="wifi">⌁</span>
          <span className="battery">95</span>
        </div>
      </div>

      <header className="create-subject-header">
        <button className="create-subject-close" onClick={onBack} aria-label="关闭">
          <Icon type="close" />
        </button>
        <h1>创建主体</h1>
        <span className="create-subject-header-spacer"></span>
      </header>

      {useGalleryLayout ? (
        <section className="create-subject-gallery-layout">
          <div className="create-subject-gallery-track">
            {mergedImages.map((src, index) => (
              <div className="create-subject-gallery-panel" key={`${src}-${index}`}>
                <img src={src} alt="主体预览" />
                <div className="create-subject-preview-actions create-subject-gallery-panel-actions">
                  <button aria-label="替换" onClick={index === 0 ? onOpenAlbumPicker : onOpenExtraPicker} type="button"><Icon type="replace" /></button>
                  <button aria-label="删除" onClick={index === 0 ? onDeletePrimary : () => onDeleteExtra(index - 1)} type="button"><Icon type="trash" /></button>
                </div>
              </div>
            ))}
            <button className="create-subject-gallery-add" onClick={onOpenExtraPicker} type="button">
              <span>+</span>
              <strong>添加</strong>
              <i className="create-subject-extra-ai" onClick={(event) => {
                event.stopPropagation()
                onOpenSmartFill()
              }}>AI</i>
            </button>
          </div>
        </section>
      ) : (
        <section className="create-subject-top">
          <div className="create-subject-preview-card">
            <img src={imageSrc} alt="主体预览" />
            <div className="create-subject-preview-actions">
              <button aria-label="替换" onClick={onOpenAlbumPicker} type="button"><Icon type="replace" /></button>
              <button aria-label="删除" type="button"><Icon type="trash" /></button>
            </div>
          </div>
          <div className="create-subject-sidecards">
            <button className="create-subject-sidecard" onClick={onOpenExtraPicker} type="button">
              <span>+</span>
              <strong>其他视角补充</strong>
            </button>
            <button className="create-subject-sidecard" onClick={onOpenSmartFill} type="button">
              <span>+</span>
              <strong>AI 智能补全</strong>
              <i className="create-subject-badge"><Icon type="leaf" />5</i>
            </button>
          </div>
        </section>
      )}

      <section className="create-subject-form">
        <div className="create-subject-field-group">
          <label>填写名称*</label>
          <div className="create-subject-input">请输入简洁的名称<span>0/20</span></div>
        </div>

        <div className="create-subject-field-group create-subject-tag-field-group">
          <label>选择标签*</label>
          <button className={`create-subject-select${isTagMenuOpen ? ' open' : ''}`} onClick={onToggleTagMenu} type="button">
            <span>{tag}</span>
            <Icon type="chevronDown" />
          </button>
          {isTagMenuOpen && (
            <div className="create-subject-dropdown">
              {createSubjectTagOptions.map((option) => (
                <button
                  className={option === tag ? 'selected' : ''}
                  key={option}
                  onClick={() => onSelectTag(option)}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <button className="create-subject-submit" type="button">创建</button>
      <div className="picker-home-indicator"></div>
    </main>
  )
}

function SubjectEnhancePage({ imageSrc, selectedIndex, onBack, onSelect }) {
  const enhanceGroups = [
    ['/vedios/耳机.jpg', '/vedios/耳机.jpg', '/vedios/背景.jpg'],
    ['/vedios/耳机.jpg', '/vedios/头枕.png', '/vedios/背景.jpg'],
    ['/vedios/耳机.jpg', '/vedios/手机.jpg', '/vedios/背景.jpg'],
  ]

  return (
    <main className="subject-enhance-screen">
      <div className="status-bar video-status subject-enhance-status">
        <span>17:13</span>
        <div className="system-icons">
          <span className="signal">••••</span>
          <span className="wifi">⌁</span>
          <span className="battery">95</span>
        </div>
      </div>

      <header className="subject-enhance-header">
        <button className="subject-enhance-back" onClick={onBack} aria-label="返回">
          <Icon type="back" />
        </button>
        <h1>AI 补全其他视角</h1>
        <span className="subject-enhance-header-spacer"></span>
      </header>

      <div className="subject-enhance-preview-wrap">
        <div className="subject-enhance-preview-card">
          <img src={imageSrc} alt="主体预览" />
        </div>
      </div>

      <section className="subject-enhance-options">
        <h2>选择你最满意的一组补充视角</h2>
        <div className="subject-enhance-list">
          {enhanceGroups.map((group, index) => {
            const selected = selectedIndex === index

            return (
              <button
                className={`subject-enhance-option${selected ? ' selected' : ''}`}
                key={index}
                onClick={() => onSelect(index)}
                type="button"
              >
                <span className={`subject-enhance-radio${selected ? ' selected' : ''}`}>
                  {selected && <Icon type="check" />}
                </span>
                <div className="subject-enhance-thumbs">
                  {group.map((src, thumbIndex) => (
                    <div className="subject-enhance-thumb" key={`${index}-${thumbIndex}-${src}`}>
                      <img src={src} alt="补全视角" />
                    </div>
                  ))}
                </div>
              </button>
            )
          })}
        </div>
      </section>

      <div className="subject-enhance-actions">
        <button className="subject-enhance-regenerate" type="button"><Icon type="leaf" />5再次生成</button>
        <button className="subject-enhance-confirm" type="button">确定使用</button>
      </div>
    </main>
  )
}

function OptionGroup({ title, options, activeIndex, withLogo = false, withOpenAi = false, compact = false }) {
  const shouldStackImageModels = withOpenAi && options.length >= 3

  return (
    <div className="option-group">
      <h2>{title}</h2>
      <div className={`option-list${compact ? ' compact' : ''}${shouldStackImageModels ? ' image-model-options' : ''}`}>
        {options.map((option, index) => (
          <button className={index === activeIndex ? 'selected' : ''} key={option}>
            {withLogo && <span className="model-logo">◔</span>}
            {withOpenAi && (index === 0 ? <span className="openai-logo">◎</span> : <span className="model-logo">◔</span>)}
            <span>{option}</span>
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
    close: <path d="M5.4 5.4 12 12l6.6-6.6 2 2L14 14l6.6 6.6-2 2L12 16l-6.6 6.6-2-2L10 14 3.4 7.4l2-2Z" />,
    chevronDown: <path d="m6.7 9.3 5.3 5.4 5.3-5.4 1.4 1.4-6.7 6.7-6.7-6.7 1.4-1.4Z" />,
    replace: <path d="M7 7h7V5l4 4-4 4v-2H9v4h8v-2l4 4-4 4v-2H7v-6h2v4h6v-4H7V7Z" />,
    trash: <path d="M8 5V3h8v2h4v2H4V5h4Zm1 4h2v8H9V9Zm4 0h2v8h-2V9Zm-6 12a2 2 0 0 1-2-2V8h14v11a2 2 0 0 1-2 2H7Z" />,
    leaf: <path d="M12 3c4.1 0 7 2.8 7 6.8 0 5-3.9 9.2-7 11.2C8.9 19 5 14.8 5 9.8 5 5.8 7.9 3 12 3Zm-1.4 11.7 5-5-1.4-1.4-3.6 3.6V7H9.2v6.7h1.4Z" />,
    check: <path d="m9.2 16.8-4-4 1.9-1.9 2.1 2.1 7-7 1.9 1.9-8.9 8.8Z" />,
    gradientStar: <><defs><linearGradient id="gradientStar" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff8a42" /><stop offset="55%" stopColor="#ff5cb8" /><stop offset="100%" stopColor="#8a7bff" /></linearGradient></defs><path fill="url(#gradientStar)" d="m12 2.6 2.2 4.8 5.2.7-3.8 3.6.9 5.2-4.5-2.4-4.5 2.4.9-5.2-3.8-3.6 5.2-.7L12 2.6Zm6 11.5 1 2.2 2.4.3-1.8 1.7.4 2.4-2-1.1-2 1.1.4-2.4-1.8-1.7 2.4-.3 1-2.2Z" /> </>,
    swap: <path d="M7 7h12v2H7l2.4 2.4L8 12.8 3.2 8 8 3.2l1.4 1.4L7 7Zm10 10H5v-2h12l-2.4-2.4L16 11.2l4.8 4.8-4.8 4.8-1.4-1.4L17 17Z" />,
    idea: <path d="M12 3a6 6 0 0 0-3.2 11.1c.5.3.7.8.7 1.4V16h5v-.5c0-.6.3-1.1.7-1.4A6 6 0 0 0 12 3Zm-2 15h4v2h-4v-2Zm1-8 1-3 1 3 3 1-3 1-1 3-1-3-3-1 3-1Z" />,
    filter: <path d="M4 5h16l-6.3 7.1V19l-3.4-1.9v-5L4 5Zm3.3 2 4.7 5.2L16.7 7H7.3Z" />,
    agentVideo: <path d="M4 7h10a2 2 0 0 1 2 2v1.6l4-2.3v7.4l-4-2.3V15a2 2 0 0 1-2 2H4V7Zm2 2v6h8V9H6Zm-1.6-4 .8 1.6 1.8.4-1.8.4-.8 1.6-.8-1.6-1.8-.4 1.8-.4.8-1.6Zm5 13 .7 1.3 1.5.3-1.5.3-.7 1.4-.7-1.4-1.5-.3 1.5-.3.7-1.3Z" />,
    more: <path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />,
    layers: <path d="M12 3 4 7.5 12 12l8-4.5L12 3Zm-6.4 7.8L12 14.4l6.4-3.6L20 12l-8 4.5L4 12l1.6-1.2Zm0 4.7L12 19.1l6.4-3.6L20 16.8l-8 4.5-8-4.5 1.6-1.3Z" />,
    settings: <path d="m12 3 1.1 2.2 2.4.4-.8 2.3 1.7 1.8-1.7 1.8.8 2.3-2.4.4L12 17l-1.1-2.2-2.4-.4.8-2.3-1.7-1.8 1.7-1.8-.8-2.3 2.4-.4L12 3Zm0 5.2A3.8 3.8 0 1 0 12 15.8 3.8 3.8 0 0 0 12 8.2Z" />,
    reset: <path d="M6.4 6.4A8 8 0 1 1 4 12H2a10 10 0 1 0 3-7.1L3 3v6h6L6.4 6.4Z" />,
    face: <path d="M5 5h7v2H7v5H5V5Zm12 0h2v7h-2V7h-5V5h5ZM7 17h5v2H5v-7h2v5Zm12-5v7h-7v-2h5v-5h2ZM9 10h2v2H9v-2Zm6 0h2v2h-2v-2Zm-6 5c2 1.6 5 1.6 7 0l1.1 1.7c-2.9 2.2-6.3 2.2-9.2 0L9 15Z" />,
    video: <path d="M4 6h10a2 2 0 0 1 2 2v2.2l4-2.5v8.6l-4-2.5V16a2 2 0 0 1-2 2H4V6Zm2 2v8h8V8H6Zm2-5 1.2 2.3L12 6 9.2 6.7 8 9 6.8 6.7 4 6l2.8-.7L8 3Zm10 0 .8 1.6 1.7.4-1.7.4L18 7l-.8-1.6-1.7-.4 1.7-.4L18 3Z" />,
    image: <path d="M5 5h14v14H5V5Zm2 2v9l3.8-4.2 3 3.3 1.8-2.1L17 14.6V7H7Zm8.5 1.8a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4Zm2-5.8.8 1.6 1.7.4-1.7.4-.8 1.6-.8-1.6L15 5l1.7-.4.8-1.6Z" />,
    imagePlus: <path d="M4 5h12v12H4V5Zm2 2v6.9l2.9-3.2 2.3 2.5 1.4-1.7L14 13.3V7H6Zm9.4-3 .7 1.4 1.5.3-1.5.3-.7 1.5-.7-1.5-1.5-.3 1.5-.3.7-1.4Zm3.1 3.9v2.2h2.2v1.8h-2.2v2.2h-1.8v-2.2h-2.2v-1.8h2.2V7.9h1.8Z" />,
    pose: <path d="M13 4.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM7 9l3.4 1.6 4.6-2 1 2.1-4.4 1.9v3.1L15 20l-2 1.4-3.2-4.2-2.2 4.6-2.2-1 3.4-7.1L5.9 12 7 9Zm11-3 .6 1.2 1.4.3-1.4.3L18 9l-.6-1.2-1.4-.3 1.4-.3L18 6Z" />,
    home: <path d="M4 11.5 12 5l8 6.5V20H7a3 3 0 0 1-3-3v-5.5Zm8 4.5c2.4 0 4.2-.9 5.3-2.5l-2-.9c-.7.8-1.8 1.2-3.3 1.2s-2.6-.4-3.3-1.2l-2 .9C7.8 15.1 9.6 16 12 16Z" />,
    star: <path d="m12 3 2.7 5.4 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6-4.3-4.2 6-.9L12 3Z" />,
    spark: <path d="M12 3c1.1 4.1 2.9 5.9 7 7-4.1 1.1-5.9 2.9-7 7-1.1-4.1-2.9-5.9-7-7 4.1-1.1 5.9-2.9 7-7Z" />,
    camera: <path d="M7 7.5 8.8 5h6.4L17 7.5h3a2 2 0 0 1 2 2V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5a2 2 0 0 1 2-2h3Zm5 3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" />,
    assets: <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Zm0 2.3L5.7 8v8l6.3 3.2 6.3-3.2V8L12 4.8Zm0 2.4 4.4 2.2v1.9L12 9.1 7.6 11.3V9.4L12 7.2Zm-4.4 5 3.4 1.8v3.3l-3.4-1.7v-3.4Zm8.8 0v3.4L13 17.3V14l3.4-1.8Z" />,
    briefcase: <path d="M8 5V3h8v2h4a2 2 0 0 1 2 2v3h-8v2h-4v-2H2V7a2 2 0 0 1 2-2h4Zm2 0h4V5h-4v0Zm12 7v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7h8v2h4v-2h8Z" />,
    me: <path d="M8 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm-9 4.5c2.4 2.6 7.6 2.6 10 0l1.5 1.3c-3.2 3.7-9.8 3.7-13 0L7 14.5ZM12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Z" />,
    arrowRight: <path d="M6 11h9.2l-3.6-3.6L13 6l6 6-6 6-1.4-1.4 3.6-3.6H6v-2Z" />,
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true">{icons[type]}</svg>
}

export default App
