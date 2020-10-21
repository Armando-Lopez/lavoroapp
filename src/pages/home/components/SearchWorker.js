import React from "react";

const SearchWorker = ({ onChange }) => {
    return (
        <form className="col s12 m6 offset-m1">
            <div className="input-field">
                <i className="material-icons prefix">search</i>
                <input
                    id="search"
                    type="search"
                    required
                    onChange={onChange}
                    autoComplete="off"
                />
                <label htmlFor="search">Busca por Hablidades</label>
            </div>
        </form>
    );
};

export default SearchWorker;
