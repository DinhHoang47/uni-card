export default function DisplaySetting({ openSelect }) {
  return (
    <>
      <div className={`w-full space-y-4 ${openSelect ? "" : "sm:!mt-0"}`}>
        {/* Setting & button */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 justify-between items-center">
          {/* Setting */}
          <div className="flex items-center space-x-3 font-semibold ">
            <span>Display:</span>
            <div className="flex items-center space-x-2">
              <label htmlFor="kanji-setting">Kanji</label>
              <input
                className="h-4 w-4"
                type="checkbox"
                name=""
                id="kanji-setting"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="definition-setting">Definition</label>
              <input
                className="h-4 w-4"
                type="checkbox"
                name=""
                id="definition-setting"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="example-setting">Example</label>
              <input
                className="h-4 w-4"
                type="checkbox"
                name=""
                id="example-setting"
              />
            </div>
          </div>
          {/* Actions */}
        </div>
      </div>
    </>
  );
}
