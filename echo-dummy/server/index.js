import { WebApp } from 'meteor/webapp';

const limitDepth = (obj) => {
	const aux = (obj, depth) => {
		if (depth > 3) {
			return `[ ${typeof obj} ]`;
		}
		if (typeof obj !== 'object' || obj === null) {
			return obj;
		}

		if (Array.isArray(obj)) {
			return obj.reduce((acc, item) => {
				return [
					...acc,
					aux(item, depth + 1),
				];
			}, []);
		} else {
			return Object.keys(obj).reduce((acc, key) => {
				return {
					...acc,
					[key]: aux(obj[key], depth + 1),
				};
			}, {});
		}
	};

	return aux(obj, 1);
};

const stripPrivateProperties = (obj) => {
	const aux = (obj, depth) => {
		if (typeof obj !== 'object' || obj === null) {
			return obj;
		}

		if (Array.isArray(obj)) {
			return obj.reduce((acc, item) => {
				return [
					...acc,
					aux(item, depth + 1),
				];
			}, []);
		} else {
			return Object.keys(obj).reduce((acc, key) => {
				if (key[0] === '_') {
					return acc;
				} else {
					return {
						...acc,
						[key]: aux(obj[key], depth + 1),
					};
				}
			}, {});
		}
	};

	return aux(obj, 1);
};

// Listen to incoming HTTP requests (can only be used on the server).
WebApp.connectHandlers.use('/', (req, res, next) => {
	const visibleReq = stripPrivateProperties(limitDepth(req));

  res.writeHead(200);
  res.end(`
<h1>Hello world from: ${Meteor.release}.</h1>
<p>Your request url is ${visibleReq.url}.</p>
<pre>
${JSON.stringify(visibleReq, null, 2)}
</pre>
`);
});