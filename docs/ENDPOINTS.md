# Endpoint Reference

## GET /ai/chatgpt

Endpoint:

```txt
https://api.pixxxry.eu.cc/ai/chatgpt
```

Parameters:

| Parameter | Required | Keterangan |
|---|---|---|
| message | yes | prompt |
| model | no | model, default `default` |

Response path:

```txt
result.result
```

## GET /ai/copilot

Endpoint:

```txt
https://api.pixxxry.eu.cc/ai/copilot
```

Parameters:

| Parameter | Required | Keterangan |
|---|---|---|
| message | yes | prompt |
| model | no | default, think-deeper, gpt-5 |

Response path:

```txt
result.text
```

## GET /ai/deepseek

Endpoint:

```txt
https://api.pixxxry.eu.cc/ai/deepseek
```

Parameters:

| Parameter | Required | Keterangan |
|---|---|---|
| message | yes | prompt |
| model | no | deepseek-chat |
| provider | no | deepseek |
| system | no | system prompt |

Response path:

```txt
result.result
```

## GET /ai/claude

Endpoint:

```txt
https://api.pixxxry.eu.cc/ai/claude
```

Parameters:

| Parameter | Required | Keterangan |
|---|---|---|
| message | yes | prompt |
| session | no | session id |

Response path:

```txt
result.answer
```
