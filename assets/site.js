const installCommands = {
  mac: "curl -fsSL https://antigravity.google/cli/install.sh | bash",
  linux: "curl -fsSL https://antigravity.google/cli/install.sh | bash",
  powershell: "irm https://antigravity.google/cli/install.ps1 | iex",
  cmd: "curl -fsSL https://antigravity.google/cli/install.cmd -o install.cmd && install.cmd && del install.cmd"
};

function updateInstallCommand(value) {
  const output = document.querySelector("[data-install-output]");
  if (!output) return;
  output.textContent = installCommands[value] || installCommands.mac;
}

document.addEventListener("change", (event) => {
  const target = event.target;
  if (target && target.matches("[data-install-choice]")) {
    updateInstallCommand(target.value);
  }
});

document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy-target]");
  if (!button) return;
  const target = document.querySelector(button.dataset.copyTarget);
  if (!target) return;
  try {
    await navigator.clipboard.writeText(target.textContent.trim());
    button.textContent = "Copied";
    setTimeout(() => {
      button.textContent = "Copy";
    }, 1400);
  } catch {
    button.textContent = "Select text";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const checked = document.querySelector("[data-install-choice]:checked");
  if (checked) updateInstallCommand(checked.value);
});
