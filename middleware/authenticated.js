export default function({store, redirect, error}) {
    if (!store.state.authenticated) {
        console.log(error);
        return redirect('/login')
    }
}