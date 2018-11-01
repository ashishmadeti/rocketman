PHABRICATOR_ROOT_URL =  '< Complete url of the phabricator instance, ex: "http://phab.example.com/" >'
LAST_BLOG_ID = '< Integer denoting the last blog id, ex: if "http://phab.example.com/J2" is the most recent blog, then set this to "2" >'


class Script {

    constructor() {
        this.mostRecentBlogId = parseInt(LAST_BLOG_ID)
    }

    /**
     * @params {object} request
     */
    process_incoming_request({ request }) {

        // Regexes for finding different Phabricator objects
        var maniphestRegex = /\b(T\d+):/ig;
        var differentialRegex = /\b(D\d+):/ig;
        var phameRegex = /\bpublished (Blog Post):/ig;
        var diffusionRegex = /\b(R(?:\d+:|[a-z]{1,10})[0-9a-f]{10,40}):/ig;

        var text = request.content.storyText;

        var maniphestMatch = maniphestRegex.exec(text);
        if (maniphestMatch) {
            var replaceText = `[${maniphestMatch[1]}](${PHABRICATOR_ROOT_URL + maniphestMatch[1]})`
            text = text.replace(maniphestMatch[1], replaceText);
        }

        var differentialMatch = differentialRegex.exec(text);
        if (differentialMatch) {
            var replaceText = `[${differentialMatch[1]}](${PHABRICATOR_ROOT_URL + differentialMatch[1]})`
            text = text.replace(differentialMatch[1], replaceText);
        }

        var phameMatch = phameRegex.exec(text);
        if (phameMatch) {
            var nextBlogId = this.mostRecentBlogId + 1
            var replaceText = `[${phameMatch[1]}](${PHABRICATOR_ROOT_URL + 'J' + nextBlogId})`
            text = text.replace(phameMatch[1], replaceText)
            this.mostRecentBlogId = nextBlogId
        }

        var diffusionMatch = diffusionRegex.exec(text);
        if (diffusionMatch) {
            var replaceText = `[${diffusionMatch[1]}](${PHABRICATOR_ROOT_URL + diffusionMatch[1]})`
            text = text.replace(diffusionMatch[1], replaceText);
        }

        if (!text) {
            return;
        }

        return {
            content: {
                text: text
            }
        };
    }
}
