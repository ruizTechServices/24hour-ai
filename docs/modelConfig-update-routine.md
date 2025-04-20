# Routine for Updating `modelConfig.ts`

## 1. Gather Model Information
- Obtain the **exact model name** (API value) and a **user-friendly label**.
- Confirm the model is supported by your backend/provider integration.
- If possible, check the provider’s docs or admin dashboard for new model releases.

## 2. Edit the Config File
- Open `libs/llm/modelConfig.ts`.
- Locate the provider section (e.g., `openai`, `anthropic`).
- **Add a new entry** in the relevant array:

```ts
openai: [
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' }, // <-- new model
  // ...
],
```

- For a **new provider**, add a new key with its model array:

```ts
mistral: [
  { value: 'mistral-medium', label: 'Mistral Medium' },
],
```

## 3. Type Safety
- The types (`ProviderKey`, `ModelValue`) are automatically updated due to `as const`.
- If you use these types in your frontend/backend, you’re always type-safe.

## 4. Sync With Backend
- Make sure your backend provider class/factory recognizes the new model.
- If you add a new provider, implement its class and add it to your provider factory.

## 5. Test
- Select the new model/provider in your UI and send a test message.
- Confirm the backend handles the request and returns a valid response.

## 6. Document the Change
- Optionally update your project docs or README to note new model/provider support.
- If working in a team, mention the update in your PR or commit message.

---

## Best Practice Tips
- **Keep this config as the single source of truth** for all model options.
- **Never hardcode model names** elsewhere in your codebase.
- **Review provider API docs** regularly for new/retired models.
- **Automate:** If you want, you can script fetching model lists from APIs and updating this file, but manual review is usually safest for production.

---

## Summary Table

| Step            | Action                                                      |
|-----------------|-------------------------------------------------------------|
| Gather Info     | Confirm model value/label and backend support               |
| Edit modelConfig.ts | Add new model/provider entry                            |
| Type Safety     | Types auto-update; use everywhere for safety                |
| Sync Backend    | Ensure backend/factory supports the new model/provider      |
| Test            | Try in UI and check backend response                        |
| Document        | Update docs and/or PR notes                                 |
