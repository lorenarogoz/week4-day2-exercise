import {parseUserConfig, parseUsersConfig} from './exercise.js';

const inputs = [
    `{"id":"u1","email":"a@b.com","role":"intern"}`,
    `{"id":"u2","email":"a@b.com","role":"boss"}`,
    `{"email":"a@b.com","role":"intern"}`,
    `{ invalid json }`,
];

console.log('\n parsUserConfig: ');

for (const s of inputs) {
    const result = parseUserConfig(s);
    if (result.ok) {
        console.log('ok  ', result.value);
    } else {
        console.log('shape error', result.error);
    }
}

const listInputs = [
    `[{"id":"u1","email":"a@b.com","role":"intern"},{"id":"u2","email":"x@y.com","role":"mentor"}]`,
    `{"id":"u1","email":"a@b.com"}`,
    `[{"id":"u1","email":"a@b.com","role":"intern"},{"id":"u2","email":"x@y.com"}]`,
];

console.log('\n parseUsersConfig: ');

for (const s of listInputs) {
    const result = parseUsersConfig(s);
    if (result.ok) {
        console.log('ok ', result.value);
    } else {
        console.log('shape error', result.error);
    }
}
