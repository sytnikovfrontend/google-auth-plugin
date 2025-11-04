chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "addContentScript") {
        addContentScript(msg.email, msg.password);
    }
});

async function addContentScript(email, password) {
    const updatedTab = await chrome.tabs.update({
        url: "https://accounts.google.com/AddSession",
    });

    await new Promise((resolve) => {
        const listener = (tabId, changeInfo) => {
            if (tabId === updatedTab.id && changeInfo.status === "complete") {
                chrome.tabs.onUpdated.removeListener(listener);
                resolve();
            }
        };
        chrome.tabs.onUpdated.addListener(listener);
    });

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });

    try {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"],
        });

        chrome.tabs.sendMessage(tab.id, {
            email: email.trim(),
            password: password.trim(),
        });
    } catch (err) {
        console.error("Failed add script, err:", err);
    }
}
