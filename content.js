chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (location.host === "accounts.google.com") {
        login(message.email, message.password);
    }
});

async function login(email, password) {
    let el = await waitFor('input[type="email"][jsname="YPqjbf"]');
    setVal(el, email);
    document.querySelector("#identifierNext")?.click();

    el = await waitFor('input[type="password"][jsname="YPqjbf"]', 10000);
    setVal(el, password);
    document.querySelector("#passwordNext")?.click();
}

function setVal(el, val) {
    el.focus();
    el.value = val;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    el.blur();
}

function waitFor(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
        const t0 = Date.now();
        (function poll() {
            const el = document.querySelector(selector);
            if (el) return resolve(el);
            if (Date.now() - t0 > timeout) return reject("timeout");
            setTimeout(poll, 200);
        })();
    });
}
