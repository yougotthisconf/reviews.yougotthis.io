require('dotenv').config()
const { baseID, apiKey, tableName } = process.env
const AirtablePlus = require('airtable-plus')
const airtable = new AirtablePlus({ baseID, apiKey, tableName })
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
}

exports.handler = async (event, context) => {
    try {
        const { id, score, notes, reviewer } = event.queryStringParameters
        const payload = {
            [reviewer + ' Score']: Number(score)
        }
        if (notes) payload[reviewer + ' Notes'] = notes
        const resp = await airtable.update(id, payload)
        return {
            headers,
            statusCode: 200,
            body: JSON.stringify({ message: 'Successfully submitted' })
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
