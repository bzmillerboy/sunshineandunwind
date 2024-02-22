interface IframeProps {
  url?: string
}

export default function Iframe({ url }: IframeProps) {
  return (
    <div
      className="container relative w-full h-96 mb-16"
      style={{
        paddingBottom: '80%',
      }}
    >
      <iframe
        className="absolute top-0 left-0 w-full h-full border-0 overflow-y-hidden"
        src={url}
        allowFullScreen={true}
        aria-hidden="false"
        tabIndex={0}
      ></iframe>
    </div>
  )
}
