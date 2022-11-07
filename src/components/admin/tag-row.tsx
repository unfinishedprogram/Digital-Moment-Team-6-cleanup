import Select from "react-select";
import styles from "../../../styles/tag-association.module.scss"

export type TagAssociationProps = {
  tagName:  string;
  occurrences: number;
  selectedSdgIssue: string;
  sdgIssueList: string[];
}

export default function TagAssociation(props: TagAssociationProps)  {
  return (
    <div className={styles.associationRow}> 
      <div className={styles.leftCol}>
        <p> {props.occurrences} </p>
        <p> {props.tagName} </p>
      </div>
      <div className={styles.rightCol}> 
        <Select options={props.sdgIssueList.map(s => {return { value: s, label: s}})} />
      </div>
    </div>
  )
}

