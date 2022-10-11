import { useTitle } from "./useTitle";

const HooksPrivate = () => {
    const title = "测试私人的title";
    useTitle(title);
    // const {} = useTitle(title)
}
export default HooksPrivate;