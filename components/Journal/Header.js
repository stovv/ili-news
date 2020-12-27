import Heading from "../Typography/Heading";
import TagBar from "../Forms/TagBar";
//import containers from "../../styles/Containers.module.css";


export default function JournalHeader({children, rubrics, emoji}){
    return (
        <>
            <Heading level={1} margin={"88px 0 32px 0"} textAlign={"center"}>{children}</Heading>
            {
                rubrics &&
                    <div style={{height: "104px", padding: "var(--spacing-block) 0", marginBottom: "24px"}}>
                        <TagBar tags={rubrics.map(rubric => ({
                            text: rubric.title,
                            link: { rubric }
                        }))}/>
                    </div>
            }
        </>

    );
}