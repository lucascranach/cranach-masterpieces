const toolbar = `
  <div class="settings-toolbar">
    <ul class="settings-list">
      <li class="settings-item">
        <button popovertarget="theme-settings-popover">
          <span class="icon" aria-hidden="true">settings_brightness</span>
        </button>
      </li>
    </ul>
  </div>
`;

const themeSelector = `
  <div id="theme-settings-popover" class="settings-popover" popover>
    <button class="close-btn" popovertarget="theme-settings-popover" popovertargetaction="hide">
      <span class="icon">close</span>
      <span class="sr-only">Close</span>
    </button>
    <h2>Theme Settings</h2>
      <form>
        <div class="settings-form-section">
          <fieldset class="two-by">
            <div>
              <input type="radio" checked id="dark" name="theme" value="dark">
              <label for="dark"><span class="icon">dark_mode</span> Dark Mode</label>
            </div>
            <div>
              <input type="radio" id="light" name="theme" value="light">
              <label for="light"><span class="icon">light_mode</span> Light Mode</label>
            </div>
          </fieldset>
        </div>
    </form>
  </div>
`;

module.exports = { toolbar, themeSelector };




