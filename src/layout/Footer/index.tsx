import styles from '../../styles/login.module.scss'

export default function Footer(){
    return(
        <footer className={`bg-dark ${styles.footer}`}>
            <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
        </footer>
    )
}