import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import templateMapper from "../../utils/templateMapper";
import useRefresh from "../../utils/useRefresh";

const TemplateRenderer = ({ templateId, resume }) => {
  const refresh = useRefresh();
  const [TemplateComponent, setTemplateComponent] = useState(null);
  const [currentStyleSheetUrl, setCurrentStyleSheetUrl] = useState(null);

  const componentRef = useRef();

  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/template/${templateId}`
        );

        const { file } = response.data.data;
        const Component = templateMapper[file];

        const cssModules = import.meta.glob("./templates/**/style.css");

        const previousLinks = document.querySelectorAll(
          "link[data-dynamic-style]"
        );
        previousLinks.forEach((link) => document.head.removeChild(link));

        for (const key in cssModules) {
          if (cssModules.hasOwnProperty(key)) {
            const regex = /\.\/templates\/(.*)\/style\.css$/;
            const match = key.match(regex);

            if (match && match[1] === file) {
              const newStyleSheetModule = await cssModules[key]();
              const newStyleSheetUrl = newStyleSheetModule.default;

              const newLinkElement = document.createElement("link");
              newLinkElement.rel = "stylesheet";
              newLinkElement.href = newStyleSheetUrl;
              newLinkElement.setAttribute("data-dynamic-style", true);

              document.head.appendChild(newLinkElement);
              setCurrentStyleSheetUrl(newStyleSheetUrl);
              setTemplateComponent(() => Component);
              break;
            }
          }
        }
      } catch (error) {
        console.error("Error fetching template data:", error);
      }
    };

    fetchTemplateData();

    return () => {
      if (currentStyleSheetUrl) {
        const linkToRemove = document.querySelector(
          `link[href="${currentStyleSheetUrl}"][data-dynamic-style]`
        );
        if (linkToRemove) {
          document.head.removeChild(linkToRemove);
        }
        setCurrentStyleSheetUrl(null);
        refresh();
      }
    };
  }, [templateId, currentStyleSheetUrl, refresh]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return TemplateComponent ? (
    <div className="print-container">
      <main>
        <div className="print-content" ref={componentRef}>
          <TemplateComponent resume={resume} />
        </div>
      </main>
      <button onClick={handlePrint} className="button download-temp-btn">
        Download as PDF
      </button>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default TemplateRenderer;
