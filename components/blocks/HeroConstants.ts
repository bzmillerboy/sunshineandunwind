export const sizeClasses = {
  compact: 'h-auto px-0 py-1 mb-1 lg:px-0 lg:py-2 lg:mb-2',
  default: 'h-auto mb-16 py-16', //default if no size is set
  small: 'min-h-[370px] mb-8 py-16',
  auto: 'min-h-[370px] mb-8 py-16', //deprecated value or 'small'
  medium: 'min-h-[508px] mb-16 py-16',
  '60vh': 'min-h-[508px] mb-16 py-16', //deprecated value or 'medium'
  large: 'min-h-[580px] mb-16 py-16',
  '80vh': 'min-h-[580px] mb-16 py-16', //deprecated value or 'large'
  xlarge: 'min-h-[680px] mb-16 py-16',
  '100vh': 'min-h-[680px] mb-16 py-16', //deprecated value or 'xlarge'
  fullView: 'h-[100vh] mb-16 py-16', //deprecated value or 'xlarge'
}
export const bgClasses = {
  true: 'linear-gradient(to right, rgba(255, 255, 255, 0.75) 50vw, rgba(229, 218, 181, 0.5) 100%',
  false: 'linear-gradient(90deg,rgba(0,0,0,.74) 35%,rgba(0,0,0,.64))',
}
export const bgVideoClasses = {
  // background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGElEQVQYV2P8////f0YQYGBgYPj//38DAEeUB4C3hBEFAAAAAElFTkSuQmCC),
  // linear-gradient(to right, rgba(255, 255, 255, 0.75) 50vw, rgba(229, 218, 181, 0.5) 100%);
  true: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGElEQVQYV2P8////f0YQYGBgYPj//38DAEeUB4C3hBEFAAAAAElFTkSuQmCC), linear-gradient(to right, rgba(255, 255, 255, 0.75) 50vw, rgba(229, 218, 181, 0.5) 100%)',
  false:
    'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFUlEQVQYV2NkYGD4z8DAwMjIAAHGAA5cATak54O5AAAAAElFTkSuQmCC), linear-gradient(to right, rgba(0, 0, 0, 0.5) 35%, rgba(0, 0, 0, 0.37) 100%)',
}
export const bgImageSize = {
  compact: { width: 307, height: 40 },
  default: { width: 1440, height: 260 },
  small: { width: 1440, height: 370 },
  auto: { width: 1440, height: 370 }, //deprecated value or 'small'
  medium: { width: 1440, height: 508 },
  '60vh': { width: 1440, height: 508 }, //deprecated value or 'medium'
  large: { width: 1440, height: 580 },
  '80vh': { width: 1440, height: 580 }, //deprecated value or 'large'
  xlarge: { width: 1440, height: 680 },
  '100vh': { width: 1440, height: 680 }, //deprecated value or 'xlarge'
  fullView: { width: 1920, height: 1070 }, //deprecated value or 'xlarge'
}
