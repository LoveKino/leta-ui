'use strict';

let LambdaUI = require('../..');

let {
    dsl, interpreter
} = require('leta');

let {
    getJson
} = dsl;

let {
    n, view
} = require('kabanery');

let demo = view(() => {
    let predicates = {
        math: {
            '+': (x, y) => x + y
        }
    };

    let run = interpreter(predicates);

    let updateShowView = null;

    let valueShowView = view(({
        value
    }, {
        update
    }) => {
        updateShowView = update;

        return n('div', {
            style: {
                marginTop: 10
            }
        }, [value]);
    });

    return () => n('div', [
        LambdaUI({
            predicatesMetaInfo: {
                math: {
                    '+': {
                        args: [{
                            type: 'number',
                            name: 'number'
                        }, {
                            type: 'number',
                            name: 'number'
                        }]
                    }
                }
            },

            predicates,

            onchange: (v) => {
                updateShowView('value', v && v instanceof Error ? n('pre', v.stack) : n('span', run(getJson(v)).toString()));
            }
        }),

        valueShowView({
            value: n('span', '')
        })
    ]);
});

/**
 * type system
 *   basic type: number, string, boolean, function, object, array
 */
document.body.appendChild(demo({}));