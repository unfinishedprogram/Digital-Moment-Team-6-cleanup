import { useState } from "react";
import style from "../../../styles/admin.module.scss";
import AdminData from "./admin-data"
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
    {title: "Hackathons at my School", author: "John", body: "I'd like to host a hackathon at my school!"},
    {title: "Abuse at Home", author: "Jane", body: "My home situation is hostile."},
    {title: "Refused by Local", author: "Jeremy", body: "A man discriminated against me in my community today."},
    {title: "Garden", author: "William", body: "I would like to start a garden in my neighbourhood!"},
    {title: "New Space", author: "Alex", body: "I have a space that can be used for group projects."},
    {title: "Hungry before School", author: "Din", body: "I often go to school hungry. I feel like it affects my ability to learn."},
    {title: "Flood", author: "Ravneet", body: "There has been a big flood near me and we lost our house."},
    {title: "No Friends", author: "Tony", body: "I find it very hard to make friends in this new place."},
  ]);

  return (
    <div className={style.adminWrapper}>

      {currentPage == PagesOptions.Tags && (
        <div className={style.tagsWrapper}>
          { TAGS.map((tag, index) =>
            <TagAssociation sdgIssueList={SDGS} tagName={tag} occurrences={10} selectedSdgIssue={""} key={index}/>
          ) }
        </div>
      )
      }

      {currentPage == PagesOptions.Stats && (
        <AdminData/>
      )}

      {currentPage == PagesOptions.Review && (
        <PostValidationMenu post={posts}/>
      )}

      <Footer selected={currentPage} onClick={(arg) => setCurrentPage(arg)}/>

    </div>
  )
}
