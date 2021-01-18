export default function Loader({ style, className }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "0 80px",
        ...style,
      }}
      className={className}
    >
      <div className={"globalLoader"}>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
