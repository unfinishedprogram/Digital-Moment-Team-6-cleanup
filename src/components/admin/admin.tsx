import { useState } from "react";
import style from "../../../styles/admin.module.scss";
import Footer, { PagesOptions } from "./footer";
import PostValidationMenu from "./post-validation";
import TagAssociation from "./tag-row";
const SDGS = [
  "Poverty",
  "Hunger",
  "Healthy Lives",
  "Inclusive and Quality education",
  "Gender Equality",
  "Access to water and sanitization",
  "Affordable, reliable, sustainable energy for all",
  "Economic growth and employment",
]

const TAGS = [
  "Racism",
  "Poverty",
  "Immigration",
  "Civil Rights",
  "Gender Inequality",
  "Health Care",
  "Bullying",
];

export default function Admin() {
  const [currentPage, setCurrentPage] = useState<PagesOptions>(PagesOptions.Stats);
  const [posts, setPosts] = useState([
    {title: "Hackathons are wacky", author: "Someone", body: "HAHAH I'M GOING INSANE"},
    {title: "Hackathons are wacky", author: "Someone", body: "HAHAH I'M GOING INSANE"},
    {title: "Hackathons are wacky", author: "Someone", body: "HAHAH I'M GOING INSANE"},
    {title: "Hackathons are wacky", author: "Someone", body: "HAHAH I'M GOING INSANE"},
    {title: "Hackathons are wacky", author: "Someone", body: "HAHAH I'M GOING INSANE"},
    {title: "Hackathons are wacky", author: "Someone", body: "HAHAH I'M GOING INSANE"},
    {title: "Hackathons are wacky", author: "Someone", body: "HAHAH I'M GOING INSANE"},
    {title: "Hackathons are wacky", author: "Someone", body: "HAHAH I'M GOING INSANE"},
  ]);

  return (
    <div className={style.adminWrapper}>

      {currentPage == PagesOptions.Stats && (
        <div className={style.tagsWrapper}>
          { TAGS.map((tag, index) =>
            <TagAssociation sdgIssueList={SDGS} tagName={tag} occurrences={10} selectedSdgIssue={""} key={index}/>
          ) }
        </div>
      )
      }

      {currentPage == PagesOptions.Review && (
        <PostValidationMenu post={posts}/>
      )}

      <Footer selected={currentPage} onClick={(arg) => setCurrentPage(arg)}/>

    </div>
  )
}
