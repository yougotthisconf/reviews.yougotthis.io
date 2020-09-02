require('dotenv').config()
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
}

exports.handler = async (event, context) => {
    try {
        return {
            headers,
            statusCode: 200,
            body: JSON.stringify(process.env.reviewers.split(','))
        }
    } catch (e) {
        console.error('Error', e)
        return {
            headers,
            statusCode: 500,
            body: JSON.stringify({ error: e.toString() })
        }
    }
}
