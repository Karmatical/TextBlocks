
// User Configuration
let Language = 'EN-US';
let Theme = 'Dark';

function switchLanguage(lang) {
    currentLanguage = lang;
    updateSelectionDisplays();
    document.querySelectorAll('.dropdown-menu.visible').forEach(menu => menu.classList.remove('visible'));
}

function switchTheme(theme) {
     currentTheme = theme.charAt(0).toUpperCase() + theme.slice(1);
     updateSelectionDisplays();
     document.querySelectorAll('.dropdown-menu.visible').forEach(menu => menu.classList.remove('visible'));
}

function handleFileAction(action) {
     const projectName = document.getElementById('projectNameInput').value;
     showMessage(`${action} initiated for project: "${projectName}"`, false, 4000);
     document.querySelectorAll('.dropdown-menu.visible').forEach(menu => menu.classList.remove('visible'));
}

// Dropdown
function toggleDropdown(event, menuId) {
     event.stopPropagation();
     const menu = document.getElementById(menuId);
     if (!menu) return;

     const parentMenu = menu.parentElement.closest('.dropdown-menu');
     if (!parentMenu) {
         document.querySelectorAll('.relative > .dropdown-menu').forEach(topMenu => {
             if (topMenu.id !== menuId) {
                 topMenu.classList.remove('visible');
             }
         });
     }
     else {
         const siblingSubmenus = parentMenu.querySelectorAll('.relative > .dropdown-menu');
         siblingSubmenus.forEach(subMenu => {
             if (subMenu.id !== menuId) {
                 subMenu.classList.remove('visible');
             }
         });
     }

     menu.classList.toggle('visible');
}

// Pop-up Window
function showPopup(modalId) {
    const modal = document.getElementById(modalId);
    if (modalId === 'detailsModal') {
        const projectName = document.getElementById('projectNameInput').value;
        document.getElementById('modalProjectName').textContent = projectName;
    }
 modal.classList.remove('hidden');
}

function hidePopup(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Bottom Message
function showMessage(text, isError = false, duration = 4000) {
     const box = document.getElementById('messageBox');
     box.textContent = text;
     box.classList.remove('hidden', 'bg-red-600', 'bg-yellow-600');
     box.classList.add(isError ? 'bg-red-600' : 'bg-yellow-600');

     requestAnimationFrame(() => {
         box.classList.remove('opacity-0');
         box.classList.add('opacity-100');
     });

     setTimeout(() => {
         box.classList.remove('opacity-100');
         box.classList.add('opacity-0');
         setTimeout(() => box.classList.add('hidden'), 300);
     }, duration);
}

// Current Actor
const Tabs = ['CODE', 'COSTUME', 'SOUNDS'];

let Tab = 'CODE';
let Workspace = 'Background';

// Tab Switch
function switchTab(tabName, silent = false) {
     currentTab = tabName;

     // 1. Update Tab Styling
     Tabs.forEach(tab => {
         const tabElement = document.getElementById(`tab-${tab.toLowerCase()}`);
         if (tab === currentTab) {
             tabElement.style.backgroundColor = '#0891b2';
             tabElement.style.color = '#fff';
             tabElement.classList.remove('text-gray-400');
             tabElement.classList.add('text-white');
         } else {
             tabElement.style.backgroundColor = 'transparent';
             tabElement.style.color = 'rgb(156 163 175)';
             tabElement.classList.remove('text-white');
             tabElement.classList.add('text-gray-400');
         }
     });

     // 2. Update Editor Display (Placeholder)
     document.getElementById('currentTabDisplay').textContent = currentTab;
}

// Init
window.onload = function() {
 switchTab(Tab, true);
}

// Action Listener
document.addEventListener('click', (event) => {
     // 1. Close Dropdowns
     document.querySelectorAll('.dropdown-menu.visible').forEach(menu => {
         menu.classList.remove('visible');
     });

     // 2. Handle Actor Rename Blur
     actorsData.forEach(actor => {
         if (actor.isEditing) {
             const inputField = document.getElementById(`input-${actor.id}`);
             // Only save if the click wasn't on the input field itself
             if (inputField && !inputField.contains(event.target)) {
                 saveRename(actor.id, event, false);
             }
         }
     });
});