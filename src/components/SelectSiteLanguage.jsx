export default function SelectSiteLanguage() {
  return (
    <div className="form-floating select-lang">
      <select
        className="form-select"
        id="selectLanguage"
        aria-label="Floating label select language"
      >
        <option defaultValue>Polish</option>
        <option value="1">English</option>
      </select>
      <label htmlFor="countrySelect">Site Language</label>
    </div>
  );
};
