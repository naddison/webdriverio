/**
 * The `$` command is a short way to call the [`findElement`](/docs/api/webdriver.html#findelement) command in order
 * to fetch a single element on the page similar to the `$` command from the browser scope. The difference when calling
 * it from an element scope is that the driver will look within the children of that element.
 *
 * Note: chaining `$` and `$$` commands only make sense when you use multiple selector strategies. You will otherwise
 * make unnecessary requests that slow down the test (e.g. `$('body').$('div')` will trigger two request whereas
 * `$('body div')` does literary the same with just one request)
 *
 * For more information on how to select specific elements, see [`Selectors`](/docs/selectors.html).
 *
 * <example>
    :index.html
    <ul id="menu">
        <li><a href="/">Home</a></li>
        <li><a href="/">Developer Guide</a></li>
        <li><a href="/">API</a></li>
        <li><a href="/">Contribute</a></li>
    </ul>
    :$.js
    it('should get text a menu link', () => {
        const text = $('#menu');
        console.log(text.$$('li')[2].$('a').getText()); // outputs: "API"
    });

    it('should get text a menu link - JS Function', () => {
        const text = $('#menu');
        console.log(text.$$('li')[2].$(function() { // Arrow function is not allowed here.
            // this is Element https://developer.mozilla.org/en-US/docs/Web/API/Element
            // in this particular example it is HTMLLIElement
            // TypeScript users may do something like this
            // return (this as Element).querySelector('a')
            return this.querySelector('a'); // Element
        }).getText()); // outputs: "API"
    });
 * </example>
 *
 * @alias $
 * @param {String|Function} selector  selector or JS Function to fetch a certain element
 * @return {Element}
 * @type utility
 *
 */
import { findElement } from '../../utils'
import { getElement } from '../../utils/getElementObject'

export default async function $ (selector) {
    const res = await findElement.call(this, selector)
    return getElement.call(this, selector, res)
}
