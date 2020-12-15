
import { connect } from 'react-redux';
import SearchBar from './SearchBar';


const mapStateToProps = () => ({
});
const mapDispatchToProps = {
    searchbar: SearchBar
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);