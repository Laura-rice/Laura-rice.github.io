export function PageIntro({ index, title, description }) {
  return <section className="page-intro"><span>{index}</span><h1>{title}</h1><p>{description}</p></section>;
}
