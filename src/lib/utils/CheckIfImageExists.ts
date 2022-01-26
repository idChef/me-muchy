export async function checkIfImageExists(doFirst, url, callback) {
	doFirst();

	try {
		const res = await fetch(url);
		if (res.status == 200) callback(true);
		else callback(false);
	} catch (err) {
		console.error(err);
	}
}
