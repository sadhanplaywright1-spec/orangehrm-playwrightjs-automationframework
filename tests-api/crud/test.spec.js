const { test, expect } = require('@playwright/test');
const path = require('path');
const UserCollection = require(
    '../../api-crud-config/collections/user.collection'
);

const {
    readExcel
} = require(
    '../../api-crud-config/helpers/excel.helper'
);

const {
    serialize,
    deserialize
} = require(
    '../../api-crud-config/helpers/json.helper'
);


// ============================================================
// EXCEL FILE
// ============================================================

const excelPath = path.resolve(
      __dirname,
    '../../api-crud-config/data/crud-data.xlsx'
);

// ============================================================
// READ EXCEL DATA
// ============================================================

const testData = readExcel(excelPath);

// ============================================================
// DATA DRIVEN TESTING
// ============================================================
for (const data of testData) {

    test(
        `${data.testCase} - ${data.testName}`,
        async ({ request }) => {

            console.log('');
            console.log('======================================');
            console.log(`Test Case : ${data.testCase}`);
            console.log(`Test Name : ${data.testName}`);
            console.log('======================================');


            // ==================================================
            // DESERIALIZE PAYLOAD
            // ==================================================

            const payload =
                deserialize(data.payload);

            console.log(
                'Deserialized Payload:',
                payload
            );


            // ==================================================
            // SERIALIZE PAYLOAD
            // ==================================================

            const serializedPayload =
                serialize(payload);

            console.log(
                'Serialized Payload:',
                serializedPayload
            );


            // ==================================================
            // DESERIALIZE AGAIN BEFORE API
            // ==================================================

            const finalPayload =
                deserialize(serializedPayload);


            // ==================================================
            // CREATE
            // ==================================================

            if (data.testName === 'Create User') {

                const users =
                    new UserCollection(request);

                const response =
                    await users.createUser(
                        finalPayload
                    );

                console.log(
                    'CREATE Status:',
                    response.status()
                );

                expect(
                    response.status()
                ).toBe(201);

                const responseBody =
                    await response.json();

                console.log(
                    'CREATE Response:',
                    responseBody
                );

                expect(
                    responseBody.name
                ).toBe(finalPayload.name);

                expect(
                    responseBody.job
                ).toBe(finalPayload.job);
            }


            // ==================================================
            // READ
            // ==================================================

            if (data.testName === 'Get User') {

                const users =
                    new UserCollection(request);

                const response =
                    await users.getUser(
                        Number(data.userId)
                    );

                console.log(
                    'GET Status:',
                    response.status()
                );

                expect(
                    response.status()
                ).toBe(200);

                const responseBody =
                    await response.json();

                console.log(
                    'GET Response:',
                    responseBody
                );

                expect(
                    responseBody.data.id
                ).toBe(Number(data.userId));

                expect(
                    responseBody.data.email
                ).toBe(
                    finalPayload.expectedEmail
                );
            }


            // ==================================================
            // UPDATE
            // ==================================================

            if (data.testName === 'Update User') {

                const users =
                    new UserCollection(request);

                const response =
                    await users.updateUser(
                        Number(data.userId),
                        finalPayload
                    );

                console.log(
                    'UPDATE Status:',
                    response.status()
                );

                expect(
                    response.status()
                ).toBe(200);

                const responseBody =
                    await response.json();

                console.log(
                    'UPDATE Response:',
                    responseBody
                );

                expect(
                    responseBody.name
                ).toBe(finalPayload.name);

                expect(
                    responseBody.job
                ).toBe(finalPayload.job);

                expect(
                    responseBody.updatedAt
                ).toBeDefined();
            }


            // ==================================================
            // DELETE
            // ==================================================

            if (data.testName === 'Delete User') {

                const users =
                    new UserCollection(request);

                const response =
                    await users.deleteUser(
                        Number(data.userId)
                    );

                console.log(
                    'DELETE Status:',
                    response.status()
                );

                expect(
                    response.status()
                ).toBe(204);
            }
        }
    );
}