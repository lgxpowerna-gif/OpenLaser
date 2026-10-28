# Resume on Error

Guidance for recovering from alarms, disconnects, and generation errors.

## During a job

1. If the machine stops with **ALARM**:
   - Clear the alarm on the controller (or use the Clear Alarm control).
   - Check that the head is in a safe position.
   - Use **Resume** if the job is still loaded and the position is correct.
   - Otherwise, abort and restart from a known good point.

2. If the connection drops:
   - Reconnect (the frontend will retry firmware detection once).
   - Verify position before resuming.
   - Do not resume if the machine may have lost steps.

## Generation errors

- Actionable messages now suggest what to check (documents, settings, beam diameter, feed rate).
- Fix the issue, then click **Generate** again.
- Travel optimization runs automatically on the new G-code.

## Best practice

- Note the last successful line or position if possible.
- For critical jobs, keep a copy of the G-code file.
- Test resume behavior on scrap before relying on it for production.

See also ERRORS.md and RELIABILITY.md.
