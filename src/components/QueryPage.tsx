import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea"; // Import InputText component
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import axios from "axios";

function QueryPage() {
  const data = [{ InputBox: "Sample Text." }];

  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("Select a language");
  const [fetchingData, setFetchingData] = useState(false);

  const [orButtonClickCount, setORButtonClickCount] = useState(0);
  const [orButtonLabel, setORButtonLabel] = useState("OR");
  const [orButtonStyle, setORButtonStyle] = useState({});

  const [andButtonClickCount, setANDButtonClickCount] = useState(0);
  const [andButtonLabel, setANDButtonLabel] = useState("AND");
  const [andButtonStyle, setANDButtonStyle] = useState({});

  const [includeButtonClickCount, setIncludeButtonClickCount] = useState(0);
  const [includeButtonLabel, setIncludeButtonLabel] = useState("INCLUDE");
  const [includeButtonStyle, setIncludeButtonStyle] = useState({});

  const [excludeButtonClickCount, setExcludeButtonClickCount] = useState(0);
  const [excludeButtonLabel, setExcludeButtonLabel] = useState("EXCLUDE");
  const [excludeButtonStyle, setExcludeButtonStyle] = useState({});

  const languages = [
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "ar", name: "Arabic" },
    { code: "hi", name: "Hindi" },
  ];

  const handleButtonClick = (operation: string) => {
    console.log(`Button clicked with operation: ${operation}`);

    if (operation === "OR") {
      setORButtonClickCount(orButtonClickCount + 1);

      if (orButtonClickCount % 2 === 0) {
        setORButtonLabel("OR🖐🏽");
        setORButtonStyle({ border: "3px solid #BF55EC" });
      } else {
        setORButtonLabel("OR");
        setORButtonStyle({ border: "3px solid #ff6666" });
      }
    } else if (operation === "AND") {
      setANDButtonClickCount(andButtonClickCount + 1);

      if (andButtonClickCount % 2 === 0) {
        setANDButtonLabel("AND🖐🏽");
        setANDButtonStyle({ border: "3px solid #BF55EC" });
      } else {
        setANDButtonLabel("AND");
        setANDButtonStyle({ border: "3px solid #ff6666" });
      }
    } else if (operation === "INCLUDE") {
      setIncludeButtonClickCount(includeButtonClickCount + 1);

      if (includeButtonClickCount % 2 === 0) {
        setIncludeButtonLabel("INCLUDE🖐🏽");
        setIncludeButtonStyle({ border: "3px solid #BF55EC" });
      } else {
        setIncludeButtonLabel("INCLUDE");
        setIncludeButtonStyle({ border: "3px solid #ff6666" });
      }
    } else if (operation === "EXCLUDE") {
      setExcludeButtonClickCount(excludeButtonClickCount + 1);

      if (excludeButtonClickCount % 2 === 0) {
        setExcludeButtonLabel("EXCLUDE🖐🏽");
        setExcludeButtonStyle({ border: "3px solid #BF55EC" });
      } else {
        setExcludeButtonLabel("EXCLUDE");
        setExcludeButtonStyle({ border: "3px solid #ff6666" });
      }
    }
  };
  const handleLanguageChange = (e: any) => {
    setTargetLanguage(e.value);
  };
  const handleInputChange = (e: any) => {
    setInputText(e.target.value);
  };

  const translateText = async () => {
    try {
      setFetchingData(true);
      const response = await axios.post("https://libretranslate.de/translate", {
        q: inputText,
        source: "en",
        target: targetLanguage,
      });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error("Error translating text:", error);
    } finally {
      setFetchingData(false); // Set fetching state to false after fetching is complete
    }
  };

  useEffect(() => {
    translateText();
  }, [targetLanguage]);

  return (
    <div>
      <h1
        style={{
          backgroundColor: "#1087e8",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px",
          padding: "20px",
        }}
      >
        React with PrimeReact UI
      </h1>
      <br />
      <div className="card">
        <DataTable
          showGridlines
          tableStyle={{ minHeight: "30rem" }}
          value={data}
        >
          <Column
            field="InputBox"
            header="Search Test"
            body={() => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <InputTextarea
                  placeholder="Enter text to translate..."
                  value={inputText}
                  onChange={handleInputChange}
                  style={{ marginRight: "10px" }}
                />
                {fetchingData ? (
                  
                  <ProgressSpinner
                    style={{
                      width: "50px",
                      height: "50px",
                      marginLeft: "10px",
                    }}
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    animationDuration=".5s"
                  />
                ) : (
                  <>
                    =
                    <InputTextarea
                      style={{ marginLeft: "10px" }}
                      value={translatedText}
                    />
                  </>
                )}
              </div>
            )}
          />
          <Column
            header="Operation"
            body={() => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <Button
                    label={orButtonLabel}
                    className="p-button-raised p-button-rounded"
                    style={{ marginRight: "10px", ...orButtonStyle }}
                    outlined
                    onClick={() => handleButtonClick("OR")}
                  />
                  <Button
                    label={andButtonLabel}
                    className="p-button-raised p-button-rounded"
                    style={{ marginRight: "10px", ...andButtonStyle }}
                    outlined
                    onClick={() => handleButtonClick("AND")}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    label={includeButtonLabel}
                    className="p-button-raised p-button-rounded"
                    style={{ marginBottom: "10px", ...includeButtonStyle }}
                    outlined
                    onClick={() => handleButtonClick("INCLUDE")}
                  />
                  <Button
                    label={excludeButtonLabel}
                    className="p-button-raised p-button-rounded"
                    style={{ marginBottom: "10px", ...excludeButtonStyle }}
                    outlined
                    onClick={() => handleButtonClick("EXCLUDE")}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Dropdown
                    value={targetLanguage}
                    options={languages.map((lang) => ({
                      label: lang.name,
                      value: lang.code,
                    }))}
                    onChange={handleLanguageChange}
                    placeholder="Select a language"
                  />
                </div>
              </div>
            )}
            style={{ textAlign: "center" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}

export default QueryPage;
