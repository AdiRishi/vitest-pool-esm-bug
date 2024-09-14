interface Env {}

// Needed to convince TS that the fetch handler is defined
interface LocalExportedHandler<Env> extends ExportedHandler<Env> {
	fetch: ExportedHandler<Env>['fetch'];
}
