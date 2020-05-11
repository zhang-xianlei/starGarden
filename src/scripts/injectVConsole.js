import VConsole from 'vconsole'
import {
    detectOS
} from './utils'

if (detectOS().isMobile) {
    /* eslint-disable */
    const vConsole = new VConsole()
}
