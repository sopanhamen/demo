export const WindowFrame = Object.freeze({
  ALUMINUM_FRAME: 0,
  ALUMINUM_FRAME_WITH_SLIDING_GLASSES: 1,
  WOOD: 2,
  IRON: 3
})

export const WindowFrameLabel = Object.freeze({
  [WindowFrame.ALUMINUM_FRAME]: 'aluminum_frame',
  [WindowFrame.ALUMINUM_FRAME_WITH_SLIDING_GLASSES]:
    'aluminum_frame_with_sliding_glasses',
  [WindowFrame.WOOD]: 'wood',
  [WindowFrame.IRON]: 'iron'
})
