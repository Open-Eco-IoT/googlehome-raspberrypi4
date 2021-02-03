const isGoogleInstance = (agent, conv) => {

    if (!conv) {
        agent.add(`Only requests from Google Assistant are supported.
        Find the XXX action on Google Assistant directory!`);
        return false;
    }
    return true;
}

const hasScreenSurface = conv => conv && conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');

const hasAudioSurface = conv => conv && conv.surface.capabilities.has('actions.capability.AUDIO_OUTPUT');

const hasWebBrowserSurface = conv => conv && conv.surface.capabilities.has('actions.capability.WEB_BROWSER');

const formatDate = date => `${date.getFullYear()}-` +
                            `${date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)}-` +
                            `${date.getDate() > 9 ? date.getDate() : "0" + date.getDate()}`;

const formatMoney = num => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');


exports.isGoogleInstance = isGoogleInstance;
exports.hasScreenSurface = hasScreenSurface;
exports.hasAudioSurface = hasAudioSurface;
exports.hasWebBrowserSurface = hasWebBrowserSurface;
exports.formatDate = formatDate;
exports.formatMoney = formatMoney;