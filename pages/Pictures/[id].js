import { useRouter } from "next/router";
import Picture from "../../components/Picture";
import { Component } from "react";

export default class PicturePage extends Component {
	
    static getInitialProps({query}) {
        return {query}
	}
	
	state = {
		id: null,
	}
	
	componentDidMount() {
		const { query } = this.props;

		this.setState({
			id: query.id,
		});
	}
	
	render() {
		const { id } = this.state;

		return id && <Picture id={id} standalone />
	}
}
