import Faqlist from "../components/Faq/Faqlist";
import faqimg from "../assets/faq-img.png";

function Faq() {
  return (
    <div>
      <section>
        <div className="container mt-10 px-4 text-3xl ">
          <div className="flex flex-col lg:flex-row items-center gap-[50px] lg:gap-0">
            <div className="w-full lg:w-1/2 hidden lg:block">
              <img
                src={faqimg}
                alt="FAQ"
                className="w-3/5  h-3/5 object-cover ml-10"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="heading font-bold">
                Most Asked Questions by Our Beloved Family:
              </h2>
              <Faqlist />
            </div>
          </div>
        </div>
      </section>
      ;
    </div>
  );
}

export default Faq;
