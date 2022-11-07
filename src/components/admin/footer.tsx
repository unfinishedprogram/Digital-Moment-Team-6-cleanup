import styles from "../../../styles/admin.module.scss"
export enum PagesOptions {
  Stats,
  Tags,
  Review
}

type FooterProps = {
  onClick: (arg: PagesOptions) => void;
  selected: PagesOptions
}

export default function Footer(props: FooterProps) {

  return (
    <div className={styles.footer}>
      <button className={`${styles.entry} ${props.selected == PagesOptions.Stats ? styles.active : ""}`} onClick={() => props.onClick(PagesOptions.Stats)}>
        <img src="/img/chart-pie.svg"/>
        <p> Stats </p>
      </button>
      <button className={`${styles.entry} ${props.selected == PagesOptions.Tags ? styles.active : ""}`} onClick={() => props.onClick(PagesOptions.Tags)}>
        <img src="/img/tag.svg"/>
        <p> Tags </p>
      </button>
      <button className={`${styles.entry} ${props.selected == PagesOptions.Review ? styles.active : ""}`} onClick={() => props.onClick(PagesOptions.Review)}>
        <img src="/img/writing.svg"/>
        <p> Review </p>
      </button>
    </div>
  )
}
