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

  const onClick = () => {
    setIsDisplayingSettings(!isDisplayingSettings);
  }

  return (
    <>
    {isDisplayingSettings && (
      <div className={styles.settingsModal}>
        <TagSelector tags={props.tags} onSelect={(tag: string) => props.onFilterChange({filteredTags: [tag]})}/>
      </div>


    )}

    <div className={styles.settingsIcon} onClick={onClick}>
      <img src="/img/settings.svg"/>
    </div>
    </>
  )
  
}

