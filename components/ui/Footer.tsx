import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.methodology}>
          <h2 className={styles.heading}>Metodología</h2>
          <p>
            Los datos provienen de la API pública de la{" "}
            <strong>Comisión Nacional de Energía (CNE)</strong> de Chile,
            específicamente de los módulos <em>Capacidad Instalada</em> y{" "}
            <em>Generación Distribuida</em> de Energía Abierta. Los registros
            de capacidad instalada corresponden a centrales clasificadas como
            ERNC según la normativa vigente. La generación distribuida incluye
            instalaciones de net billing registradas ante la CNE. Los datos se
            actualizan una vez a la semana.
          </p>
        </div>

        <div className={styles.credits}>
          <p className={styles.credit}>
            Desarrollo:{" "}
            <a
              href="https://agenciachucao.cl/?utm_source=proyecto-matriz&utm_medium=referral&utm_campaign=credit_footer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fabián Núñez
            </a>
          </p>
          <p className={styles.source}>
            Datos:{" "}
            <a
              href="https://api.cne.cl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Comisión Nacional de Energía
            </a>
          </p>
          <p className={styles.source}>
            Foto:{" "}
            <a
              href="https://unsplash.com/es/@angarav?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              target="_blank"
              rel="noopener noreferrer"
            >
              Antonio García
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
