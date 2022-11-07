import { useState } from "react";
import styles from "../../../styles/settings.module.scss"
import TagSelector from "../general/tagSelector"

export type FilterChange = {
  filteredTags: string[] | undefined;
}

export type SettingsButtonComponentProps = {
  tags: string[]
  onFilterChange: (arg: FilterChange) => void;
}

export default function SettingsButton(props: SettingsButtonComponentProps) {
  const [isDisplayingSettings, setIsDisplayingSettings] = useState(false);

  const clickHandler = () => {
    setIsDisplayingSettings(!isDisplayingSettings);
  }

  return (
    <>
      {isDisplayingSettings && (
        <>
          <div className={styles.closeModal} onClick={clickHandler}>
          </div>
          <div className={styles.settingsModal}>
            <h1>Filters</h1>
            <TagSelector tags={props.tags} onSelect={(tag: string) => props.onFilterChange({ filteredTags: [tag] })} />
          </div>
        </>
      )}

      <div className={styles.settingsIcon} onClick={clickHandler}>
        <img src="/img/settings.svg" />
      </div>
    </>
  )

}

