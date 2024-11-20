import { faqs } from "../../assets/data/faqs";
import FaqItem from "./Faqitem";

export default function Faqlist() {
  return (
    <div>
      <ul className="mt-[38px]">
        {faqs.map((item, index) => (
          <FaqItem item={item} key={index} />
        ))}
      </ul>
    </div>
  );
}
